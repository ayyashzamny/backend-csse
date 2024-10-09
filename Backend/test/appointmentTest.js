// Use dynamic imports in an async function
(async () => {
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    const server = await import('../server.js'); // Ensure .js extension
  
    chai.default.should();
    chai.default.use(chaiHttp.default);
  
    describe('Appointments API', () => {
  
      // Test the GET /appointments route
      describe('GET /appointments', () => {
        it('should GET all the appointments', (done) => {
          chai.default.request(server.default)
            .get('/api/appointments')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        });
      });
  
      // Test the POST /appointments route
      describe('POST /appointments', () => {
        it('should POST a new appointment', (done) => {
          const appointment = {
            patient_id: 1,
            doctor_id: 2,
            appointment_date: "2023-12-15",
            appointment_time: "14:00:00",
            appointment_type: "InPerson",
            status: "Pending",
            payment_status: "Pending",
            payment_amount: 150
          };
          chai.default.request(server.default)
            .post('/api/appointments')
            .send(appointment)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.have.property('id');
              done();
            });
        });
      });
  
    });
  })();
  