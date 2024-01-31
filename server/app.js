import express from 'express';
import logger from 'morgan';
import cors from 'cors'
import sensorRouter from './routes/sensor';
import climateRouter from './routes/climateSensor';
import enviromentalRouter from './routes/environmentalSensor';
import weatherRouter from './routes/weatherSensor'; 


var app = express();

app.use(logger('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

 

app.use('/sensors', sensorRouter);
app.use('/climate',climateRouter)
app.use('/enviromental',enviromentalRouter)
app.use('/weather',weatherRouter)


 



export default app;