const db = require('../config/db');  // Using the promise-based db connection
const bcrypt = require('bcryptjs');  // For password hashing

class EmployeeService {
    // Get all employees
    async getAllEmployees() {
        const sql = 'SELECT * FROM employees';  // Correct table name capitalization
        try {
            const [rows] = await db.query(sql);
            return rows;
        } catch (err) {
            throw new Error(`Error fetching employees: ${err.message}`);
        }
    }

    // Get a single employee by ID
    async getEmployeeById(id) {
        const sql = 'SELECT * FROM employees WHERE employee_id = ?';
        try {
            const [result] = await db.query(sql, [id]);
            return result.length > 0 ? result[0] : null;
        } catch (err) {
            throw new Error(`Error fetching employee with ID ${id}: ${err.message}`);
        }
    }

    


    // Create a new employee (with password hashing)
    async createEmployee(employee) {
        const { name, email, phone, role, department, date_of_joining, salary, leave_balance, password } = employee;
        
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO employees (name, email, phone, role, department, date_of_joining, salary, leave_balance, password)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        try {
            const [result] = await db.query(sql, [name, email, phone, role, department, date_of_joining, salary, leave_balance, hashedPassword]);
            return result.insertId;
        } catch (err) {
            throw new Error(`Error creating employee: ${err.message}`);
        }
    }

    // Update an existing employee by ID (with password hashing)
    async updateEmployee(id, employee) {
        const { name, email, phone, role, department, date_of_joining, salary, leave_balance } = employee;
    
        const updateQuery = `
            UPDATE employees 
            SET name = ?, email = ?, phone = ?, role = ?, department = ?, date_of_joining = ?, salary = ?, leave_balance = ?
            WHERE employee_id = ?
        `;
    
        const updateValues = [name, email, phone, role, department, date_of_joining, salary, leave_balance, id];
    
        try {
            await db.query(updateQuery, updateValues);
        } catch (err) {
            throw new Error(`Error updating employee with ID ${id}: ${err.message}`);
        }
    }

    // Delete an employee by ID
    async deleteEmployee(id) {
        const sql = 'DELETE FROM employees WHERE employee_id = ?';
        try {
            await db.query(sql, [id]);
        } catch (err) {
            throw new Error(`Error deleting employee with ID ${id}: ${err.message}`);
        }
    }

     // Get employee by email
     async getEmployeeByEmail(email) {
        const sql = 'SELECT * FROM employees WHERE email = ?';
        try {
            const [rows] = await db.query(sql, [email]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            throw new Error(`Error fetching employee by email: ${err.message}`);
        }
    }
}

module.exports = new EmployeeService();
