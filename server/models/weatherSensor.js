import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const weatherSensorSchema = new Schema({
    timestamp: { type: Date, default: 0 },
    pressure: { type: Number, default: 0 },
    wind_speed: { type: Number, default: 0 },
    sensor: { type: Schema.ObjectId, ref: 'sensor' }
})

const weatherSensorModel = mongoose.model('weatherSensor', weatherSensorSchema)

export default weatherSensorModel 