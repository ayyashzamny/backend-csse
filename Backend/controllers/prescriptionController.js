const prescriptionService = require('../services/prescriptionService');

const addPrescription = async (req, res) => {
    try {
        const { patient_id, doctor_id, medicine_name, dosage, frequency, prescription_date, status } = req.body;
        await prescriptionService.createPrescription({ patient_id, doctor_id, medicine_name, dosage, frequency, prescription_date, status });
        res.status(201).json({ message: 'Prescription added successfully' });
    } catch (error) {
        console.error('Error adding prescription:', error);
        res.status(500).json({ error: 'An error occurred while adding the prescription' });
    }
};

const getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await prescriptionService.getAllPrescriptions();
        res.status(200).json(prescriptions);
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        res.status(500).json({ error: 'An error occurred while fetching the prescriptions' });
    }
};

const getPrescriptionsByPatient = async (req, res) => {
    const { patient_id } = req.query; // Get the patient_id from the query parameters

    try {
        const prescriptions = await prescriptionService.getPrescriptionsByPatient(patient_id);
        if (prescriptions.length === 0) {
            return res.status(404).json({ message: 'No prescriptions found for this patient.' });
        }
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePrescription = async (req, res) => {
    const { prescription_id } = req.params;
    const { status } = req.body;
    try {
        await prescriptionService.updatePrescription(prescription_id, { status });
        res.status(200).json({ message: 'Prescription updated successfully' });
    } catch (error) {
        console.error(`Error updating prescription ${prescription_id}:`, error);
        res.status(500).json({ error: `An error occurred while updating prescription ${prescription_id}` });
    }
};

const deletePrescription = async (req, res) => {
    const { prescription_id } = req.params;
    try {
        await prescriptionService.deletePrescription(prescription_id);
        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (error) {
        console.error(`Error deleting prescription ${prescription_id}:`, error);
        res.status(500).json({ error: `An error occurred while deleting prescription ${prescription_id}` });
    }
};

const updatePrescriptionStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await prescriptionService.updatePrescriptionStatus(id, status);
        res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to handle the request for fetching patient prescriptions
const getPrescriptionsByPatientDoc = async (req, res) => {
    const { patient_id } = req.params;

    try {
        // Call the service to fetch prescriptions
        const prescriptions = await prescriptionService.getPrescriptionsByPatient(patient_id);

        if (prescriptions.length === 0) {
            return res.status(404).json({ message: 'No prescriptions found for this patient' });
        }

        return res.status(200).json(prescriptions);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching prescriptions', error: error.message });
    }
};

module.exports = {
    addPrescription,
    getAllPrescriptions,
    getPrescriptionsByPatient,
    updatePrescription,
    deletePrescription,
    updatePrescriptionStatus,
    getPrescriptionsByPatientDoc
};
