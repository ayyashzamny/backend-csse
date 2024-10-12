const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


// Routes
app.use('/api', require('./routes/patientRoutes')); // Use the patient routes under "/api"
app.use('/api', require('./routes/doctorRoutes')); // Use the doctor routes under "/api"
app.use('/api', require('./routes/appointmentRoutes')); // Use the appointment routes under "/api"
app.use('/api', require('./routes/paymentRoutes')); // Use the payment routes under "/api"
app.use('/api', require('./routes/employeeRoutes')); // Use the employee routes under "/api"    
app.use('/api', require('./routes/leaveRoutes')); // Use the leave routes under "/api"
// app.use('/api', require('./routes/userRoutes')); // Use the user routes under "/api"
// app.use('/api', require('./routes/authRoutes')); // Use the auth routes under "/api"


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
