const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientpatient   = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  address: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const Patient = mongoose.model('Patient',patientpatient )

module.exports = Patient