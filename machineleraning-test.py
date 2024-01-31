from datetime import datetime
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
import json 
from flask import Flask, request,jsonify

f = open('data.mc.json')
data = json.load(f)
# data = [
#     {
#         "timestamp": "2023-09-26T08:00:00",
#         "temperature": 25.5,
#         "humidity": 60.2
#     },
#     {
#         "timestamp": "2023-09-26T08:15:00",
#         "temperature": 25.7,
#         "humidity": 61.0
#     },
#     {
#         "timestamp": "2023-09-26T08:30:00",
#         "temperature": 25.9,
#         "humidity": 60.5
#     },
#     {
#         "timestamp": "2023-09-26T08:45:00",
#         "temperature": 26.1,
#         "humidity": 61.2
#     }
# ]

# Convertir la cadena de tiempo a objetos de fecha y hora y extraer el tiempo en minutos
timestamps = [datetime.strptime(o['timestamp'], "%Y-%m-%dT%H:%M:%S") for o in data]
minutes = [(ts - timestamps[0]).total_seconds() / 60 for ts in timestamps]

# Extraer las temperaturas y la humedad
temperatures = [o['temperature'] for o in data]
humidity = [o['humidity'] for o in data]

# Convertir a matrices numpy y reformatear para la regresión lineal
X = np.array(minutes).reshape(-1, 1)
y_temp = np.array(temperatures)
y_humidity = np.array(humidity)


poly_features = PolynomialFeatures(degree=2)
X_poly = poly_features.fit_transform(X)
# Crear modelos de regresión lineal para temperatura y humedad
model_temp = LinearRegression()
model_humidity = LinearRegression()

# Entrenar los modelos
model_temp.fit(X_poly, y_temp)
model_humidity.fit(X_poly, y_humidity) 
 

app = Flask(__name__)

@app.route('/predict')
def predict():

    req_minutes=request.args.get('minutes',default = 1, type = int)
    req_hours=request.args.get('hours',default = 0, type = int)
    req_days=request.args.get('days',default = 0, type = int)
    
    temp_min=15 
    temp_calc= (req_days * 1440) + (req_hours * 60 ) + req_minutes

    # si no se añaden parámetros o la suma de los parámetros en menor a 15 , entonces la predicción tomará 15 minutos como valor 
    temp_min = temp_calc if temp_calc > temp_min else temp_min
    # predicción
    future_minutes = np.array([[minutes[-1] + temp_min]])
    future_minutes_poly = poly_features.transform(future_minutes)
    future_temp = model_temp.predict(future_minutes_poly)[0]
    # future_temp = model_temp.predict(future_minutes)[0]
    future_humidity = model_humidity.predict(future_minutes_poly)[0]
    data ={
        "prediction":{
            "humidity": "{:.2f}".format(future_humidity)  ,
            "temperature":"{:.2f}".format(future_temp)
        }
    }

    return jsonify(data)

if __name__ == '__main__':
    app.run( port=5000)