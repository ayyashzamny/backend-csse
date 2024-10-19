// Use ES module import syntax for chai and chai-http
import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../server';  // Adjust according to your module format

const { should } = chai;
chai.use(chaiHttp);
should();

describe('Doctors API', () => {

  // Test the GET /doctors route
  describe('GET /doctors', () => {
    it('should GET all the doctors', (done) => {
      chai.request(server)
        .get('/api/doctors')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  // Test the POST /doctors route
  describe('POST /doctors', () => {
    it('should POST a new doctor', (done) => {
      const doctor = {
        name: "Dr. John Smith",
        specialty: "Cardiology",
        bio: "Experienced cardiologist",
        years_of_experience: 10,
        consultation_fee: 150,
        email: "dr.johnsmith@example.com",
        phone: "9876543210",
        available_from: "09:00:00",
        available_to: "17:00:00"
      };
      chai.request(server)
        .post('/api/doctors')
        .send(doctor)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('id');
          done();
        });
    });
  });

  // Test the GET /doctors/:id route
  describe('GET /doctors/:id', () => {
    it('should GET a doctor by the given ID', (done) => {
      const doctorId = 1;
      chai.request(server)
        .get(`/api/doctors/${doctorId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('doctor_id');
          res.body.should.have.property('name');
          done();
        });
    });
  });

  // Test the PUT /doctors/:id route
  describe('PUT /doctors/:id', () => {
    it('should UPDATE a doctor by the given ID', (done) => {
      const doctorId = 1;
      const updatedDoctor = {
        name: "Dr. Updated Smith",
        email: "dr.updatedsmith@example.com"
      };
      chai.request(server)
        .put(`/api/doctors/${doctorId}`)
        .send(updatedDoctor)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Doctor updated successfully');
          done();
        });
    });
  });

  // Test the DELETE /doctors/:id route
  describe('DELETE /doctors/:id', () => {
    it('should DELETE a doctor by the given ID', (done) => {
      const doctorId = 1;
      chai.request(server)
        .delete(`/api/doctors/${doctorId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Doctor deleted successfully');
          done();
        });
    });
  });

});
