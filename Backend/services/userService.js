// const db = require('../config/db'); // Assuming this is where your DB connection is configured
// const jwt = require('jsonwebtoken');

// class UserService {
//     // Find user by email
//     async getUserByEmail(email) {
//         try {
//             const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
//             return user.length > 0 ? user[0] : null; // Return the first user if found, otherwise null
//         } catch (error) {
//             throw new Error('Error fetching user by email: ' + error.message);
//         }
//     }

//     // Create new user
//     async createUser(userData) {
//         const { email, password, role, person_id } = userData;
        
//         // created_at field is managed by MySQL if set up properly
//         const result = await db.query(
//             'INSERT INTO users (email, password, role, person_id) VALUES (?, ?, ?, ?)', 
//             [email, password, role, person_id]
//         );
//         return result.insertId; // Return newly created user's ID
//     }

//     // Generate JWT token for authentication
//     generateToken(user) {
//         const payload = {
//             user_id: user.user_id,
//             email: user.email,
//             role: user.role,
//         };
//         return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
//     }
// }

// module.exports = new UserService();
