const db = require('../config/db');  // Using the promise-based db connection
const bcrypt = require('bcryptjs');  // For password hashing

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

  // Get a doctor by email (for login)
  async getDoctorByEmail(email) {
    const sql = 'SELECT * FROM doctors WHERE email = ?';
    try {
      const [result] = await db.query(sql, [email]);
      return result.length > 0 ? result[0] : null;
    } catch (err) {
      throw new Error(`Error fetching doctor with email ${email}: ${err.message}`);
    }
  }

  // Create a new doctor (hashes the password before storing it)
  async createDoctor(doctor) {
    const { name, specialty, bio, years_of_experience, consultation_fee, email, phone, available_from, available_to, password } = doctor;

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing

    const sql = `
      INSERT INTO doctors (name, specialty, bio, years_of_experience, consultation_fee, email, phone, available_from, available_to, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      const [result] = await db.query(sql, [name, specialty, bio, years_of_experience, consultation_fee, email, phone, available_from, available_to, hashedPassword]);
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
