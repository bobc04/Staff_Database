import express from 'express';
import { pool, connectToDb } from './connections';
connectToDb();
const PORT = process.env.PORT || 3001;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Create an employee
app.post('/api/employee', (req, res) => {
    const { first_name, last_name, role_id, manager_id } = req.body;
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
               VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [first_name, last_name, role_id, manager_id];
    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: result.rows[0],
        });
    });
});
// Read all employees
app.get('/api/employee', (_req, res) => {
    const sql = `SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department
               FROM employee e
               LEFT JOIN role r ON e.role_id = r.id
               LEFT JOIN department d ON r.department_id = d.id`;
    pool.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: result.rows,
        });
    });
});
// Delete an employee
app.delete('/api/employee/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = $1 RETURNING *`;
    const params = [req.params.id];
    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (!result.rows.length) {
            res.json({ message: 'employee not found' });
        }
        else {
            res.json({
                message: 'deleted',
                data: result.rows[0],
            });
        }
    });
});
// Default response for any other request (Not Found)
app.use((_req, res) => {
    res.status(404).end();
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
