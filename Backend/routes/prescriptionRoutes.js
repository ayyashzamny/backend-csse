const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

// Add a new prescription
router.post('/prescriptions', prescriptionController.addPrescription);

// Get all prescriptions with patient and doctor details
router.get('/prescriptions', prescriptionController.getAllPrescriptions);

// Get prescriptions by patient ID
router.get('/prescriptionByPatient', prescriptionController.getPrescriptionsByPatient);

// Update a prescription (e.g., change status)
router.put('/prescriptions/:prescription_id', prescriptionController.updatePrescription);

// Delete a prescription
router.delete('/prescriptions/:prescription_id', prescriptionController.deletePrescription);

// Update prescription status
router.put('/prescriptions/:prescription_id/status', prescriptionController.updatePrescriptionStatus);

// Define the route to fetch prescriptions by patient ID
router.get('/patient-prescriptions/:patient_id', prescriptionController.getPrescriptionsByPatientDoc);

module.exports = router;
