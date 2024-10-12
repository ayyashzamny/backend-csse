// const userService = require('../services/userService');
// const bcrypt = require('bcryptjs');

// class UserController {
//     // Register new user (with hashed password)
//     async registerUser(req, res) {
//         try {
//             const { email, password, role, person_id } = req.body;

//             // Validate input
//             if (!email || !password || !role || !person_id) {
//                 return res.status(400).json({ message: 'All fields are required.' });
//             }

//             // Check if user already exists
//             const existingUser = await userService.getUserByEmail(email);
//             if (existingUser) {
//                 return res.status(400).json({ message: 'User with this email already exists.' });
//             }

//             // Hash password before saving
//             const hashedPassword = await bcrypt.hash(password, 10);

//             // Register the user
//             const userId = await userService.createUser({
//                 email,
//                 password: hashedPassword,
//                 role,
//                 person_id
//             });

//             res.status(201).json({ message: 'User registered successfully.', user_id: userId });
//         } catch (error) {
//             console.error('SQL Error:', error); // Log the SQL error to the server console
//             res.status(500).json({ error: error.message }); // Send the exact error message to the frontend
//         }
//     }

//     // User Login
//     async loginUser(req, res) {
//         try {
//             const { email, password } = req.body;

//             // Validate input
//             if (!email || !password) {
//                 return res.status(400).json({ message: 'Email and password are required.' });
//             }

//             // Find user by email
//             const user = await userService.getUserByEmail(email);
//             if (!user) {
//                 return res.status(400).json({ message: 'Invalid email or password.' });
//             }

//             // Compare password
//             const isPasswordValid = await bcrypt.compare(password, user.password);
//             if (!isPasswordValid) {
//                 return res.status(400).json({ message: 'Invalid email or password.' });
//             }

//             // Generate JWT token (using your JWT logic)
//             const token = userService.generateToken(user);

//             res.status(200).json({ message: 'Login successful', token });
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     }

//     // Create new user (added method)
//     async createUser(req, res) {
//         const { email, password, role, person_id } = req.body;

//         try {
//             // Hash password before saving to DB
//             const hashedPassword = await bcrypt.hash(password, 10);

//             // Create the new user
//             const newUser = await userService.createUser({
//                 email,
//                 password: hashedPassword,
//                 role,
//                 person_id
//             });

//             res.status(201).json({ message: 'User created successfully', user_id: newUser });
//         } catch (error) {
//             console.error('Error creating user:', error);
//             res.status(500).json({ message: 'Error creating user' });
//         }
//     }
// }

// module.exports = new UserController();
