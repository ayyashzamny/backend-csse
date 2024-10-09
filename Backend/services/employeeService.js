const db = require('../config/db');  // Using the promise-based db connection

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

    // Create a new employee
    async createEmployee(employee) {
        const { name, email, phone, role, department, date_of_joining, salary, leave_balance } = employee;
        const sql = `
            INSERT INTO employees (name, email, phone, role, department, date_of_joining, salary, leave_balance)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        try {
            const [result] = await db.query(sql, [name, email, phone, role, department, date_of_joining, salary, leave_balance]);
            return result.insertId;
        } catch (err) {
            throw new Error(`Error creating employee: ${err.message}`);
        }
    }

    // Update an existing employee by ID
    async updateEmployee(id, employee) {
        const { name, email, phone, role, department, date_of_joining, salary, leave_balance } = employee;
        const sql = `
            UPDATE employees 
            SET name = ?, email = ?, phone = ?, role = ?, department = ?, date_of_joining = ?, salary = ?, leave_balance = ?
            WHERE employee_id = ?
        `;
        try {
            await db.query(sql, [name, email, phone, role, department, date_of_joining, salary, leave_balance, id]);
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
}

module.exports = new EmployeeService();
