const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicalRecordSchema = new Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  diagnosis: { type: String },
  treatment: { type: String },
  prescription: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  });


const MedicalRecord = mongoose.model('MedicalRecord',MedicalRecordSchema)

module.exports = MedicalRecord