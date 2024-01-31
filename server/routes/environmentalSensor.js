import express from 'express';
import { calcProm, calcDev, calcModa, calcMedian } from './../common/cals'
import environmentalSensorModel from './../models/environmentalSensor'
import { config } from '../config';
const router = express.Router();




router.get('/getEnvironmentalSensorData/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await environmentalSensorModel.find({ sensor: id })
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
router.get('/getCalcs/:sensor_id/:type', async (req, res) => {
    try {
        const { type, sensor_id } = req.params
        const origin = await environmentalSensorModel.find({ sensor: sensor_id }).limit(config.maxRowToCalc).sort({'timestamp':-1})
        let values = [];
        if (type === 'noise_level') {
            values = origin.map(o => o.noise_level);
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