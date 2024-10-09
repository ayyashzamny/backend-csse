const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');  // Use require for CommonJS

chai.should();
chai.use(chaiHttp);

describe('Patients API', () => {
  // Test the GET /patients route
  describe('GET /patients', () => {
    it('should GET all the patients', (done) => {
      chai.request(server)
        .get('/api/patients')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  // Test the POST /patients route
  describe('POST /patients', () => {
    it('should POST a new patient', (done) => {
      const patient = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        address: "123 Main St",
        dob: "1985-07-15",
        insurance_details: "ABC Insurance, Policy #12345",
        emergency_contact_name: "Jane Doe",
        emergency_contact_phone: "0987654321"
      };
      chai.request(server)
        .post('/api/patients')
        .send(patient)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('id');
          done();
        });
    });
  });

  // Test the GET /patients/:id route
  describe('GET /patients/:id', () => {
    it('should GET a patient by the given ID', (done) => {
      const patientId = 1;  // You should have an actual ID to test with
      chai.request(server)
        .get(`/api/patients/${patientId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('patient_id');
          res.body.should.have.property('name');
          done();
        });
    });
  });

  // Test the PUT /patients/:id route
  describe('PUT /patients/:id', () => {
    it('should UPDATE a patient by the given ID', (done) => {
      const patientId = 1;  // Use an actual patient ID
      const updatedPatient = {
        name: "Updated Name",
        email: "updated.email@example.com"
      };
      chai.request(server)
        .put(`/api/patients/${patientId}`)
        .send(updatedPatient)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Patient updated successfully');
          done();
        });
    });
  });

  // Test the DELETE /patients/:id route
  describe('DELETE /patients/:id', () => {
    it('should DELETE a patient by the given ID', (done) => {
      const patientId = 1;  // Use an actual patient ID
      chai.request(server)
        .delete(`/api/patients/${patientId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Patient deleted successfully');
          done();
        });
    });
  });
});
