const db = require('../config/db');  // Using the promise-based db connection

class PatientService {
  
  // Get all patients
  async getAllPatients() {
    const sql = 'SELECT * FROM Patients';  // Correct table name capitalization
    try {
        const [rows] = await db.query(sql);  // Using await with the promise-based db pool
        return rows;
    } catch (err) {
        throw new Error(`Error fetching patients: ${err.message}`);
    }
  }

  // Get a single patient by ID
  async getPatientById(id) {
    const sql = 'SELECT * FROM Patients WHERE patient_id = ?';  // Use patient_id from schema
    try {
        const [result] = await db.query(sql, [id]);
        return result.length > 0 ? result[0] : null;
    } catch (err) {
        throw new Error(`Error fetching patient with ID ${id}: ${err.message}`);
    }
  }

  // Create a new patient
  async createPatient(patient) {
    const { name, email, phone, address, dob, insurance_details, emergency_contact_name, emergency_contact_phone } = patient;
    const sql = `
        INSERT INTO Patients (name, email, phone, address, dob, insurance_details, emergency_contact_name, emergency_contact_phone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
        const [result] = await db.query(sql, [name, email, phone, address, dob, insurance_details, emergency_contact_name, emergency_contact_phone]);
        return result.insertId;
    } catch (err) {
        throw new Error(`Error creating patient: ${err.message}`);
    }
  }

  // Update an existing patient by ID
  async updatePatient(id, patient) {
    const { name, email, phone, address, dob, insurance_details, emergency_contact_name, emergency_contact_phone } = patient;
    const sql = `
        UPDATE Patients 
        SET name = ?, email = ?, phone = ?, address = ?, dob = ?, insurance_details = ?, emergency_contact_name = ?, emergency_contact_phone = ?
        WHERE patient_id = ?
    `;
    try {
        await db.query(sql, [name, email, phone, address, dob, insurance_details, emergency_contact_name, emergency_contact_phone, id]);
    } catch (err) {
        throw new Error(`Error updating patient with ID ${id}: ${err.message}`);
    }
  }

  // Delete a patient by ID
  async deletePatient(id) {
    const sql = 'DELETE FROM Patients WHERE patient_id = ?';  // Correct table and column name
    try {
        await db.query(sql, [id]);
    } catch (err) {
        throw new Error(`Error deleting patient with ID ${id}: ${err.message}`);
    }
  }
}

module.exports = new PatientService();
