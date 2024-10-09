// patientRoutes.js
const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.get('/patients', patientController.getAllPatients);
router.get('/patients/:patient_id', patientController.getPatientById);
router.post('/patients', patientController.createPatient);
router.put('/patients/:patient_id', patientController.updatePatient);
router.delete('/patients/:patient_id', patientController.deletePatient);

module.exports = router;