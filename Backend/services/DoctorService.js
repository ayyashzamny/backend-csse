const db = require('../config/db');  // Using the promise-based db connection

class DoctorService {

  // Get all doctors
  async getAllDoctors() {
    const sql = 'SELECT * FROM doctors';
    try {
      const [rows] = await db.query(sql);
      return rows;
    } catch (err) {
      throw new Error(`Error fetching doctors: ${err.message}`);
    }
  }

  // Get a doctor by ID
  async getDoctorById(id) {
    const sql = 'SELECT * FROM doctors WHERE doctor_id = ?';
    try {
      const [result] = await db.query(sql, [id]);
      return result.length > 0 ? result[0] : null;
    } catch (err) {
      throw new Error(`Error fetching doctor with ID ${id}: ${err.message}`);
    }
  }

  // Create a new doctor
  async createDoctor(doctor) {
    const { name, specialty, bio, years_of_experience, consultation_fee, email, phone, available_from, available_to } = doctor;
    const sql = `
      INSERT INTO doctors (name, specialty, bio, years_of_experience, consultation_fee, email, phone, available_from, available_to)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      const [result] = await db.query(sql, [name, specialty, bio, years_of_experience, consultation_fee, email, phone, available_from, available_to]);
      return result.insertId;
    } catch (err) {
      throw new Error(`Error creating doctor: ${err.message}`);
    }
  }

  // Update a doctor by ID
  async updateDoctor(id, doctor) {
    const { name, specialty, bio, years_of_experience, consultation_fee, email, phone, available_from, available_to } = doctor;
    const sql = `
      UPDATE doctors 
      SET name = ?, specialty = ?, bio = ?, years_of_experience = ?, consultation_fee = ?, email = ?, phone = ?, available_from = ?, available_to = ?
      WHERE doctor_id = ?
    `;
    try {
      await db.query(sql, [name, specialty, bio, years_of_experience, consultation_fee, email, phone, available_from, available_to, id]);
    } catch (err) {
      throw new Error(`Error updating doctor with ID ${id}: ${err.message}`);
    }
  }

  // Delete a doctor by ID
  async deleteDoctor(id) {
    const sql = 'DELETE FROM doctors WHERE doctor_id = ?';
    try {
      await db.query(sql, [id]);
    } catch (err) {
      throw new Error(`Error deleting doctor with ID ${id}: ${err.message}`);
    }
  }
}

module.exports = new DoctorService();
