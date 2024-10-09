const doctorService = require('../services/DoctorService');

class DoctorController {
  
  async getAllDoctors(req, res) {
    try {
      const doctors = await doctorService.getAllDoctors();
      res.json(doctors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getDoctorById(req, res) {
    try {
      const doctor = await doctorService.getDoctorById(req.params.doctor_id);
      if (doctor) {
        res.json(doctor);
      } else {
        res.status(404).json({ message: 'Doctor not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async createDoctor(req, res) {
    try {
      const doctorId = await doctorService.createDoctor(req.body);
      res.status(201).json({ id: doctorId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateDoctor(req, res) {
    try {
      await doctorService.updateDoctor(req.params.doctor_id, req.body);
      res.status(200).json({ message: 'Doctor updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteDoctor(req, res) {
    try {
      await doctorService.deleteDoctor(req.params.doctor_id);
      res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new DoctorController();
