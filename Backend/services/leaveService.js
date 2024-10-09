const db = require('../config/db');

class LeaveService {
    // Get all leave requests
    async getAllLeaveRequests() {
        const sql = 'SELECT * FROM leaverequests';
        const [rows] = await db.query(sql);
        return rows;
    }

    // Get leave request by ID
    async getLeaveRequestById(id) {
        const sql = 'SELECT * FROM leaverequests WHERE leave_id = ?';
        const [rows] = await db.query(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Create a new leave request
    async createLeaveRequest(leaveRequestData) {
        const { employee_id, start_date, end_date, leave_type, status, reason } = leaveRequestData;
        const sql = `
            INSERT INTO leaverequests (employee_id, start_date, end_date, leave_type, status, reason)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, [employee_id, start_date, end_date, leave_type, status, reason]);
        return result.insertId;
    }

    // Update only the status of the leave request
    async updateLeaveRequestStatus(leaveId, status) {
        const sql = 'UPDATE leaverequests SET status = ? WHERE leave_id = ?';
        await db.query(sql, [status, leaveId]);
    }

    // Method to update the entire leave request (for the employee edit)
    async updateLeaveRequest(leaveId, data) {
        const { start_date, end_date, leave_type, reason } = data;
        const query = `
            UPDATE leaverequests 
            SET start_date = ?, end_date = ?, leave_type = ?, reason = ? 
            WHERE leave_id = ?
        `;
        const values = [start_date, end_date, leave_type, reason, leaveId];

        try {
            const [result] = await db.query(query, values);
            return result;
        } catch (error) {
            throw new Error(`Unable to update leave request: ${error.message}`);
        }
    }

    // Delete a leave request
    async deleteLeaveRequest(leaveId) {
        const sql = 'DELETE FROM leaverequests WHERE leave_id = ?';
        await db.query(sql, [leaveId]);
    }
}

module.exports = new LeaveService();
