import express from 'express';
import sensorModel from './../models/sensor'

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const sensors = await sensorModel.find()
    res.status(200).send(sensors)
  } catch (error) {
    res.status(500).send(error)
  }
});
router.get('/getbyId/:id', async (req, res) => {
  try {
    const { id } = req.params
    const sensor = await sensorModel.findOne({ _id: id })
    res.status(200).send(sensor)
  } catch (error) {
    res.status(500).send(error)
  }
});
router.post('/', async (req, res) => {
  try {
    const sensor = await sensorModel.create({ ...req.body })
    res.status(200).send(sensor)
  } catch (error) {
    res.status(500).send(error)
  }
})
router.put('/update/:id', async (req, res) => {

  try {
    const { id } = req.params
    const sensor = await sensorModel.findOneAndUpdate({ _id: id }, { ...req.body })
    res.status(200).send(sensor)
  } catch (error) {
    res.status(500).send(error)
  }
})


export default router; 