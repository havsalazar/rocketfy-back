# Rocketfy Backend
run `npm install`  

run `npm start` 

servidor disponible en `localhost:3040`

## Config file 
Las variables de configuración del proyecto backend están en ->
   ` server/config.js`


## Modelo Machine learning  

Modelo simple de machine learning basado en datos de temperatura y humedad,
el modelo usa regresión lineal  para las predicciones , la documentación que usé es la siguiente :
https://scikit-learn.org/stable/auto_examples/linear_model/plot_ols.html#sphx-glr-auto-examples-linear-model-plot-ols-py

Requisitos:
- sklearn
- numpy
- flask

Dado que tenía muy pocos datos para entrenar y el modelo alucinaba demasiado lo que hice fue generar un json llamado data.mc.json y contiene datos generados de forma aleatoria usando : https://json-generator.com/#
y el template para generar el json aleatorio es 
```json
    [
      '{{repeat(100)}}',
      {
        humidity: '{{floating([55],[70],[1])}}', 
        temperature: '{{floating([55],[70],[1])}}',   
        timestamp: '{{date(new Date(2023, 0, 1), new Date(), "YYYY-MM-ddThh:mm:00")}}'     
      }
    ]
```
#### Ejecutar el modelo y API

El archivo python se encuentra en la raíz del proyecto de backend y se ejecuta mediante el código : `python3 machineleraning-test.py`

El único método disponible es :
[GET] http://127.0.0.1:5000/predict  
contiene los siguientes parámetros opcionales 
- minutes
- hours
- days
Ejemplos de como usar el api 

`http://127.0.0.1:5000/predict?minutes=50`
`http://127.0.0.1:5000/predict?hours=3`
`http://127.0.0.1:5000/predict?days=21`

También se pueden mezclar los parámetros
`http://127.0.0.1:5000/predict?hours=3&days=15`
`http://127.0.0.1:5000/predict?days=21&minutes=30`

La respuesta es un JSON con el formato 
```json
{
    "prediction": {
        "humidity": "{{float}}",
        "temperature": "{{float}}"
    }
}```