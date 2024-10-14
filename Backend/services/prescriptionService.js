const db = require('../config/db');  // Your promise-based MySQL connection

const createPrescription = async (prescription) => {
    const { patient_id, doctor_id, medicine_name, dosage, frequency, prescription_date, status } = prescription;
    const sql = `
        INSERT INTO prescriptions (patient_id, doctor_id, medicine_name, dosage, frequency, prescription_date, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    try {
        await db.query(sql, [patient_id, doctor_id, medicine_name, dosage, frequency, prescription_date, status]);
    } catch (err) {
        throw new Error(`Error creating prescription: ${err.message}`);
    }
};

const getAllPrescriptions = async () => {
    const sql = `
        SELECT 
            p.prescription_id, 
            p.medicine_name, 
            p.dosage, 
            p.frequency, 
            p.prescription_date, 
            p.status, 
            pa.name AS patient_name, 
            d.name AS doctor_name
        FROM prescriptions p
        JOIN patients pa ON p.patient_id = pa.patient_id
        JOIN doctors d ON p.doctor_id = d.doctor_id
    `;
    try {
        const [rows] = await db.query(sql);
        return rows;
    } catch (err) {
        throw new Error(`Error fetching prescriptions: ${err.message}`);
    }
};

const getPrescriptionsByPatient = async (patient_id) => {
    const sql = `
        SELECT 
            p.prescription_id, 
            p.medicine_name, 
            p.dosage, 
            p.frequency, 
            p.prescription_date, 
            p.status 
        FROM prescriptions p
        WHERE p.patient_id = ?
    `;
    try {
        const [rows] = await db.query(sql, [patient_id]);
        return rows;
    } catch (err) {
        throw new Error(`Error fetching prescriptions for patient ${patient_id}: ${err.message}`);
    }
};


const updatePrescription = async (prescription_id, { medicine_name, dosage, frequency, status, prescription_date }) => {
    const sql = `
        UPDATE prescriptions 
        SET 
            medicine_name = ?, 
            dosage = ?, 
            frequency = ?, 
            status = ?, 
            prescription_date = ?
        WHERE prescription_id = ?
    `;
    
    try {
        await db.query(sql, [medicine_name, dosage, frequency, status, prescription_date, prescription_id]);
    } catch (err) {
        throw new Error(`Error updating prescription with ID ${prescription_id}: ${err.message}`);
    }
};


const deletePrescription = async (prescription_id) => {
    const sql = `DELETE FROM prescriptions WHERE prescription_id = ?`;
    try {
        await db.query(sql, [prescription_id]);
    } catch (err) {
        throw new Error(`Error deleting prescription with ID ${prescription_id}: ${err.message}`);
    }
};

const updatePrescriptionStatus = async (id, status) => {
    const sql = 'UPDATE prescriptions SET status = ? WHERE prescription_id = ?';
    await db.query(sql, [status, id]);
};

// Service function to fetch prescriptions by patient ID along with the doctor's name
const getPrescriptionsByPatientDoc = async (patient_id) => {
    const sql = `
        SELECT 
            p.prescription_id, 
            p.medicine_name, 
            p.dosage, 
            p.frequency, 
            p.prescription_date, 
            p.status, 
            d.name AS doctor_name
        FROM prescriptions p
        JOIN doctors d ON p.doctor_id = d.doctor_id
        WHERE p.patient_id = ?
    `;

    try {
        const [rows] = await db.query(sql, [patient_id]);
        return rows;
    } catch (error) {
        throw new Error('Error fetching prescriptions: ' + error.message);
    }
};

module.exports = {
    createPrescription,
    getAllPrescriptions,
    getPrescriptionsByPatient,
    updatePrescription,
    deletePrescription,
    updatePrescriptionStatus,
    getPrescriptionsByPatientDoc
};
