const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialty: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;