import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const environmentalSensorSchema = new Schema({
    timestamp: { type: Date, default: new Date() },
    noise_level: { type: Number, default: 0 },
    air_quality: { type: String, default: '' },
    sensor: { type: Schema.ObjectId, ref: 'sensor' }
})

const environmentalSensorModel = mongoose.model('environmentalSensor', environmentalSensorSchema)

export default environmentalSensorModel 