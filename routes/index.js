require('dotenv').config();
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Patient = require('../model/Patient')
const Doctor = require('../model/Doctor')
const MedicalRecord = require('../model/MedicalRecord')
var jwt = require('jsonwebtoken');
const Patientcontroller = require('../controller/PatientController')
const DoctorController = require('../controller/DoctorController')
const MedicalRecordController = require('../controller/MedicalRecordController')


/* Patient */
router.post('/PatientCreate',Patientcontroller.Patient_create);

router.get('/PatientGet',Patientcontroller.Patient_sequre,Patientcontroller.Patient_get);

router.put('/PatientUpdate/:id',Patientcontroller.Patient_sequre,Patientcontroller.Patient_Update);

router.delete('/PatientDelete/:id',Patientcontroller.Patient_sequre,Patientcontroller.Patient_Delete);

// Doctor
router.post('/DoctorCreate',DoctorController.Doctor_create);

router.get('/DoctorGet',DoctorController.Doctor_sequre,DoctorController.Doctor_get);

router.put('/DoctorUpdate/:id',DoctorController.Doctor_sequre,DoctorController.Doctor_Update);

router.delete('/DoctorDelete/:id',DoctorController.Doctor_sequre,DoctorController.Doctor_Delete);


// MedicalRecord
router.post('/MedicalRecordCreate',MedicalRecordController.MedicalRecord_create);

router.get('/MedicalRecordGet',MedicalRecordController.MedicalRecord_sequre,MedicalRecordController.MedicalRecord_get);
// router.get('/MedicalRecordGet',MedicalRecordController.MedicalRecord_get);

router.put('/MedicalRecordUpdate/:id',MedicalRecordController.MedicalRecord_sequre,MedicalRecordController.MedicalRecord_Update);

router.delete('/MedicalRecordDelete/:id',MedicalRecordController.MedicalRecord_sequre,MedicalRecordController.MedicalRecord_Delete);


module.exports = router;
