import express from 'express';
import climateSensorModel from './../models/climateSensor';
import { calcProm, calcDev, calcModa, calcMedian } from './../common/cals'
import { config } from '../config';
const router = express.Router();


router.get('/getClimateSensorData/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const data = await climateSensorModel.find({ sensor: id })
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/getCalcs/:sensor_id/:type', async (req, res) => {
    try {
        const { type, sensor_id } = req.params
        const origin = await climateSensorModel.find({ sensor: sensor_id }).limit(config.maxRowToCalc).sort({'timestamp':-1})
        let values = [];
        if (type === 'humidity') {
            values = origin.map(o => o.humidity);
        }else if (type === 'temperature'){
            values = origin.map(o => o.temperature);
        } 
        const prom = calcProm(values)
        const dev = calcDev(values)
        const median = calcMedian(values)
        const moda = calcModa(values)
        res.status(200).send({
            prom,
            dev,
            median,
            moda
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
export default router; 