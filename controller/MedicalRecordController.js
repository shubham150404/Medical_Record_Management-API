require('dotenv').config();
const mongoose = require('mongoose');
const MedicalRecord = require('../model/MedicalRecord')
var jwt = require('jsonwebtoken');


exports.MedicalRecord_create = async function (req, res, next) {
  try {
    if (!req.body.patient || !req.body.doctor || !req.body.diagnosis || !req.body.treatment || !req.body.prescription) {
      throw new Error("Please Fill the data")
    }
    
    if (!req.body.createdAt) {
      req.body.createdAt = Date.now()
    }
    if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const MedicalRecord_data = await MedicalRecord.create(req.body)
    const Jwt_MedicalRecord = jwt.sign({ id: MedicalRecord_data._id }, process.env.SECRET_MEDICALRECORD)
    res.status(201).json({
      status: "sucess",
      message: "MedicalRecord create",
      data: MedicalRecord_data,
      Jwt_MedicalRecord
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.MedicalRecord_get = async function (req, res, next) {
  try {
    const MedicalRecord_get = await MedicalRecord.find().populate('patient').populate('doctor')
    res.status(201).json({
      status: "sucess",
      message: "MedicalRecord Find",
      data: MedicalRecord_get,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.MedicalRecord_Update = async function (req, res, next) {
  try {
    id = req.params.id
    if (req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    } else if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const MedicalRecordupdate = await MedicalRecord.findByIdAndUpdate(id, req.body)
    res.status(201).json({
      status: "sucess",
      message: "MedicalRecord Update",
      data: MedicalRecordupdate,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.MedicalRecord_Delete = async function (req, res, next) {
  try {
    id = req.params.id
    await MedicalRecord.findByIdAndDelete(id)
    res.status(201).json({
      status: "sucess",
      message: "MedicalRecord Delete",
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.MedicalRecord_sequre = async function (req, res, next) {
  try {
    let MedicalRecord_Token = req.headers.authorization
    if (!MedicalRecord_Token) {
      throw new Error("TOken not found")
    }
    const Jwt_token = jwt.verify(MedicalRecord_Token, process.env.SECRET_MEDICALRECORD);
    console.table(Jwt_token)
    next()
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}