import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const sensorSchema = new Schema({
    sensor_id: { type: Number, default: 0 },
    sensor_name: { type: String, default: '' },

})

const sensorModel = mongoose.model('sensor', sensorSchema)

export default sensorModel 