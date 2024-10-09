const db = require('../config/db');  // Ensure the database connection

class AppointmentService {

  // Get all appointments
  async getAllAppointments() {
    const sql = 'SELECT * FROM Appointments';
    try {
      const [rows] = await db.query(sql);
      return rows;
    } catch (err) {
      throw new Error(`Error fetching appointments: ${err.message}`);
    }
  }

  // Get an appointment by ID
  async getAppointmentById(id) {
    const sql = 'SELECT * FROM Appointments WHERE appointment_id = ?';
    try {
      const [result] = await db.query(sql, [id]);
      return result.length > 0 ? result[0] : null;
    } catch (err) {
      throw new Error(`Error fetching appointment with ID ${id}: ${err.message}`);
    }
  }

  // Create a new appointment
  async createAppointment(appointment) {
    const { patient_id, doctor_id, appointment_date, appointment_time, appointment_type, status, payment_status, payment_amount } = appointment;
    const sql = `
      INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, appointment_type, status, payment_status, payment_amount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      const [result] = await db.query(sql, [
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        appointment_type,
        status,
        payment_status,
        payment_amount
      ]);
      return result.insertId;
    } catch (err) {
      throw new Error(`Error creating appointment: ${err.message}`);
    }
  }

  // Update an appointment by ID
  async updateAppointment(id, appointment) {
    const { patient_id, doctor_id, appointment_date, appointment_time, appointment_type, status, payment_status, payment_amount } = appointment;
    const sql = `
      UPDATE Appointments 
      SET patient_id = ?, doctor_id = ?, appointment_date = ?, appointment_time = ?, appointment_type = ?, status = ?, payment_status = ?, payment_amount = ?
      WHERE appointment_id = ?
    `;
    try {
      await db.query(sql, [
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        appointment_type,
        status,
        payment_status,
        payment_amount,
        id
      ]);
    } catch (err) {
      throw new Error(`Error updating appointment with ID ${id}: ${err.message}`);
    }
  }

  // Delete an appointment by ID
  async deleteAppointment(id) {
    const sql = 'DELETE FROM Appointments WHERE appointment_id = ?';
    try {
      await db.query(sql, [id]);
    } catch (err) {
      throw new Error(`Error deleting appointment with ID ${id}: ${err.message}`);
    }
  }

  // Fetch appointments with patient and doctor names
  async getAppointmentsWithDetails() {
    const query = `
      SELECT 
        a.appointment_id, 
        p.name AS patient_name, 
        d.name AS doctor_name, 
        a.appointment_date, 
        a.appointment_time, 
        a.appointment_type, 
        a.status, 
        a.payment_status, 
        a.payment_amount 
      FROM Appointments a
      JOIN Patients p ON a.patient_id = p.patient_id
      JOIN Doctors d ON a.doctor_id = d.doctor_id
    `;
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (err) {
      throw new Error(`Error fetching appointments with details: ${err.message}`);
    }
  }

  async updateAppointmentStatus(appointment_id, status) {
    const query = `
      UPDATE Appointments 
      SET status = ? 
      WHERE appointment_id = ?
    `;
    try {
      await db.query(query, [status, appointment_id]);
    } catch (err) {
      throw new Error(`Error updating appointment status: ${err.message}`);
    }
  }

  async getBookedTimes(doctor_id, appointment_date) {
    const query = `
        SELECT appointment_time 
        FROM Appointments 
        WHERE doctor_id = ? 
        AND appointment_date = ?
        AND status IN ('Pending', 'Confirmed')
    `;
    const [rows] = await db.query(query, [doctor_id, appointment_date]);
    return rows.map(row => row.appointment_time.substr(0, 5)); // Ensure time is in 'HH:mm' format
}

}

module.exports = new AppointmentService();
