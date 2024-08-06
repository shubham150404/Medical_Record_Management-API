require('dotenv').config();
const mongoose = require('mongoose');
const Patient = require('../model/Patient')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.Patient_create = async function (req, res, next) {
    try {
        if (!req.body.firstName || !req.body.lastName || !req.body.dateOfBirth || !req.body.gender || !req.body.address || !req.body.phoneNumber || !req.body.email ) {
            throw new Error("Please Fill the data")
        }
        var checkgender = ['male','female','other'];
        if(!checkgender.includes(req.body.gender)){
            throw new Error("gender must be male female and other")
        }
        const Emailcheck = await Patient.findOne({ email: req.body.email })
        if (Emailcheck) {
            throw new Error("Email already exist")
        }
        if (!req.body.createdAt) {
            req.body.createdAt = Date.now()
        }
        if (!req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        }
        const Patient_data = await Patient.create(req.body)
        const Jwt_Patient = jwt.sign({ id: Patient_data._id }, process.env.SECRET_PATIENT)
        res.status(201).json({
            status: "sucess",
            message: "Patient create",
            data: Patient_data,
            Jwt_Patient
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.Patient_get = async function (req, res, next) {
    try {
        const Patient_get = await Patient.find()
        res.status(201).json({
            status: "sucess",
            message: "Patient Find",
            data: Patient_get,
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.Patient_Update = async function (req, res, next) {
    try {
        id = req.params.id
        if (req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        } else if (!req.body.updatedAt) {
            req.body.updatedAt = Date.now()
        }
        const Patient_Update = await Patient.findByIdAndUpdate(id, req.body)
        res.status(201).json({
            status: "sucess",
            message: "Patient Update",
            data: Patient_Update,
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.Patient_Delete = async function (req, res, next) {
    try {
        id = req.params.id
        await Patient.findByIdAndDelete(id)
        res.status(201).json({
            status: "sucess",
            message: "Patient Delete",
        })
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}

exports.Patient_sequre = async function (req, res, next) {
    try {
        let Patient_Token = req.headers.authorization
        if (!Patient_Token) {
            throw new Error("Token not found")
        }
        const Jwt_token = jwt.verify(Patient_Token, process.env.SECRET_PATIENT);
        next()
    } catch (error) {
        res.status(404).json({
            status: "faild",
            message: error.message,
        })
    }
}