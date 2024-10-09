// patientController.js
const patientService = require('../services/patientService');

class PatientController {
    async getAllPatients(req, res) {
        try {
            const patients = await patientService.getAllPatients();
            res.json(patients);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getPatientById(req, res) {
        try {
            const patient = await patientService.getPatientById(req.params.patient_id);
            if (patient) {
                res.json(patient);
            } else {
                res.status(404).json({ message: 'Patient not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createPatient(req, res) {
        try {
            console.log('Request Body:', req.body);  // Log incoming request body
            const patientId = await patientService.createPatient(req.body);
            res.status(201).json({ id: patientId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updatePatient(req, res) {
        try {
            console.log('Request Body:', req.body);  // Log incoming request body
            await patientService.updatePatient(req.params.patient_id, req.body);
            res.status(200).json({ message: 'Patient updated successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deletePatient(req, res) {
        try {
            await patientService.deletePatient(req.params.patient_id);
            res.status(200).json({ message: 'Patient deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new PatientController();
