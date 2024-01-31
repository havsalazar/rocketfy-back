import weatherSensorModel from './../models/weatherSensor'
import environmentalSensorModel from './../models/environmentalSensor'
import climateSensorModel from './../models/climateSensor'
import sensorModel from './../models/sensor'
import { sensor_id_1, sensor_id_2, sensor_id_3 } from './data'

const initSensors = async () => {
    const count = await sensorModel.countDocuments()
    if (count > 0) return

    await sensorModel.create(
        [
            { sensor_id: sensor_id_1.sensor_id, sensor_name: sensor_id_1.sensor_name },
            { sensor_id: sensor_id_2.sensor_id, sensor_name: sensor_id_2.sensor_name },
            { sensor_id: sensor_id_3.sensor_id, sensor_name: sensor_id_3.sensor_name }
        ]
    )
}
const initSensor1 = async () => {
    const count = await climateSensorModel.countDocuments()
    if (count > 0) return

    const sensor_1 = await sensorModel.findOne({ sensor_id: 1 })
    const tempData = sensor_id_1.data.map(o => { return { ...o, sensor: sensor_1._id } })
    await climateSensorModel.create([...tempData])
}
const initSensor2 = async () => {
    const count = await weatherSensorModel.countDocuments()
    if (count > 0) return

    const sensor_2 = await sensorModel.findOne({ sensor_id: 2 })
    const windData = sensor_id_2.data.map(o => { return { ...o, sensor: sensor_2._id } })
    await weatherSensorModel.create([...windData])
}
const initSensor3 = async () => {
    const count = await environmentalSensorModel.countDocuments()
    if (count > 0) return

    const sensor_3 = await sensorModel.findOne({ sensor_id: 3 })
    const airData = sensor_id_3.data.map(o => { return { ...o, sensor: sensor_3._id } })
    await environmentalSensorModel.create([...airData])
}
const initData = async () => {

    console.log('DataChek')

    await initSensors();

    await initSensor1();
    await initSensor2();
    await initSensor3();
}
export { initData }
