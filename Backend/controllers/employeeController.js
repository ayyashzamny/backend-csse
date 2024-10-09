const employeeService = require('../services/employeeService');

class EmployeeController {
    async getAllEmployees(req, res) {
        try {
            const employees = await employeeService.getAllEmployees();
            res.json(employees);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getEmployeeById(req, res) {
        try {
            const employee = await employeeService.getEmployeeById(req.params.employee_id);
            if (employee) {
                res.json(employee);
            } else {
                res.status(404).json({ message: 'Employee not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createEmployee(req, res) {
        try {
            console.log('Request Body:', req.body);
            const employeeId = await employeeService.createEmployee(req.body);
            res.status(201).json({ id: employeeId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateEmployee(req, res) {
        try {
            console.log('Request Body:', req.body);
            await employeeService.updateEmployee(req.params.employee_id, req.body);
            res.status(200).json({ message: 'Employee updated successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteEmployee(req, res) {
        try {
            await employeeService.deleteEmployee(req.params.employee_id);
            res.status(200).json({ message: 'Employee deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new EmployeeController();
