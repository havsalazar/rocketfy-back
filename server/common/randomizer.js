import { Chance } from 'chance'
import environmentalModel from '../models/environmentalSensor' 
import climateModel from '../models/climateSensor' 
import weatherModel from './../models/weatherSensor'
import sensorModel from './../models/sensor'
import {config} from './../config'
/*
    los datos son aleatorios para poder simular un entorno en tiempo real
    los minimos y maximos estan basados en los datos de muestra

*/
const saveOnDB = config.saveRandomOnDB;
export const generateTempHumidity = async () => {
    const sensor = await sensorModel.findOne({ sensor_id: 1 })

    const chance = new Chance();
    const data = {
        timestamp: new Date(),
        temperature: chance.floating({ min: 20, max: 40, fixed: 1 }),
        humidity: chance.floating({ min: 40, max: 80, fixed: 1 }),
        sensor: sensor._id
    }
    if (saveOnDB) {
        await climateModel.create({ ...data })
    }
    return data
}
export const generateWindPressure = async () => {
    const sensor = await sensorModel.findOne({ sensor_id: 2 })
    const chance = new Chance();
    const data = {
        timestamp: new Date(),
        pressure: chance.floating({ min: 900, max: 1020, fixed: 1 }),
        wind_speed: chance.floating({ min: 0, max: 10, fixed: 1 }),
        sensor: sensor._id
    }
    if (saveOnDB) {
        await weatherModel.create({ ...data })
    }
    return data
}

export const generateAirNoise = async () => {
    const sensor = await sensorModel.findOne({ sensor_id: 3 })
    const chance = new Chance();
    const qualities = ['Buena', 'Moderada', 'Mala', 'Excelente']
    const data = {
        timestamp: new Date(),
        noise_level: chance.floating({ min: 0, max: 140, fixed: 1 }),
        air_quality: qualities[chance.integer({ min: 0, max: 3 })],
        sensor: sensor._id

    }
    if (saveOnDB) {
        await environmentalModel.create({ ...data })
    }
    return data
}
