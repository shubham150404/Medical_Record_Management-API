require('dotenv').config();
const mongoose = require('mongoose');
const Doctor = require('../model/Doctor')
var jwt = require('jsonwebtoken');


exports.Doctor_create = async function (req, res, next) {
  try {
      if (!req.body.firstName || !req.body.lastName || !req.body.specialty || !req.body.address || !req.body.phoneNumber || !req.body.email ) {
          throw new Error("Please Fill the data")
      }
      const Emailcheck = await Doctor.findOne({ email: req.body.email })
      if (Emailcheck) {
          throw new Error("Email already exist")
      }
      if (!req.body.createdAt) {
          req.body.createdAt = Date.now()
      }
      if (!req.body.updatedAt) {
          req.body.updatedAt = Date.now()
      }
      const Doctor_data = await Doctor.create(req.body)
      const Jwt_Doctor = jwt.sign({ id: Doctor_data._id }, process.env.SECRET_DOCTOR)
      res.status(201).json({
          status: "sucess",
          message: "Doctor create",
          data: Doctor_data,
          Jwt_Doctor
      })
  } catch (error) {
      res.status(404).json({
          status: "faild",
          message: error.message,
      })
  }
}

exports.Doctor_get = async function (req, res, next) {
  try {
    const Doctor_get = await Doctor.find()
    res.status(201).json({
      status: "sucess",
      message: "Doctor Find",
      data: Doctor_get,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Doctor_Update = async function (req, res, next) {
  try {
    id = req.params.id
    if (req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    } else if (!req.body.updatedAt) {
      req.body.updatedAt = Date.now()
    }
    const DoctorUpdate = await Doctor.findByIdAndUpdate(id, req.body)
    res.status(201).json({
      status: "sucess",
      message: "Doctor Update",
      data: DoctorUpdate,
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Doctor_Delete = async function (req, res, next) {
  try {
    id = req.params.id
    await Doctor.findByIdAndDelete(id)
    res.status(201).json({
      status: "sucess",
      message: "Doctor Delete",
    })
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}

exports.Doctor_sequre = async function (req, res, next) {
  try {
    let Doctor_Token = req.headers.Doctorization
    if (!Doctor_Token) {
      throw new Error("Token not found")
    }
    const Jwt_token = jwt.verify(Doctor_Token, process.env.SECRET_DOCTOR);
    next()
  } catch (error) {
    res.status(404).json({
      status: "faild",
      message: error.message,
    })
  }
}