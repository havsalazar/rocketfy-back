import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const climateSensorSchema = new Schema({
    timestamp: { type: Date, default: 0 },
    humidity: { type: Number, default: 0 },
    temperature: { type: Number, default: 0 },
    sensor: { type: Schema.ObjectId, ref: 'sensor' }
})

const climateSensorModel = mongoose.model('climateSensor', climateSensorSchema)

export default climateSensorModel