// const employeeService = require('../services/employeeService');
// const bcrypt = require('bcryptjs');

// class AuthController {
//     async login(req, res) {
//         const { email, password } = req.body;

//         // Validate email and password
//         if (!email || !password) {
//             return res.status(400).json({ message: 'Email and password are required.' });
//         }

//         try {
//             // Get employee by email
//             const employee = await employeeService.getEmployeeByEmail(email);
//             if (!employee) {
//                 return res.status(400).json({ message: 'Invalid email or password.' });
//             }

//             // Compare passwords
//             const isPasswordValid = await bcrypt.compare(password, employee.password);
//             if (!isPasswordValid) {
//                 return res.status(400).json({ message: 'Invalid email or password.' });
//             }

//             // Return employee details to the frontend
//             res.status(200).json({
//                 message: 'Login successful',
//                 employee: {
//                     employee_id: employee.employee_id,
//                     name: employee.name,
//                     email: employee.email,
//                     role: employee.role
//                 }
//             });
//         } catch (err) {
//             return res.status(500).json({ message: 'Server error', error: err.message });
//         }
//     }
// }

// module.exports = new AuthController();
