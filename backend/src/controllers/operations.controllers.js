const pool = require('../db/database');

const getOperations = async (req, res) => {
    const { userId } = req.params;
    const response = await pool.query('SELECT * FROM income_and_expenses WHERE user_id = $1 ORDER BY id ASC', [parseInt(userId)]);
    res.json(response.rows);
}

const getByOperationId = async (req, res) => {
    const { id, userId } = req.params;
    try {
        const response = await pool.query('SELECT * FROM income_and_expenses WHERE id = $1 && user_id = $2', [id, userId]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error)
    }
}

const getOperationsHome = async (req, res) => {
    const { userId } = req.params;
    const response = await pool.query('SELECT * FROM income_and_expenses WHERE user_id = $1 ORDER BY id DESC LIMIT 10', [userId]);
    res.json(response.rows);
}

const getOperationsGraphic = async (req, res) => {
    const { userId } = req.params;
    const response = await pool.query('SELECT tipo, monto FROM income_and_expenses WHERE user_id = $1 ORDER BY id DESC LIMIT 10', [userId]);

    console.log(response.rows)
    res.json(response.rows);
}

const createOperation = async (req, res) => {
    const { concepto, monto, fecha, tipo, user_id } = req.body;
    try {
        const text = 'INSERT INTO income_and_expenses(concepto, monto, fecha, tipo, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *'
        const values = [concepto, monto, fecha, tipo, user_id];
        const response = await pool.query(text, values);

        res.status(200).json({
            message: "Operación creada con éxito"
        })

    } catch (error) {
        res.status(400).json({
            message: "Operación rechazada",
            error: error
        })
    }
}

const updateOperation = async (req, res) => {
    const { id } = req.params;
    const { concepto, monto, fecha, tipo, user_id } = req.body;
    try {
        const text = 'UPDATE income_and_expenses SET concepto = $1 , monto = $2, fecha = $3, tipo = $4, user_id = $5 WHERE id = $6'
        const values = [concepto, monto, fecha, tipo, user_id, id]

        const response = await pool.query(text, values);
        res.status(200).json({
            message: "Operación actualizada con éxito"
        })
        console.log(response.rowCount)
    } catch (error) {
        console.log(error)
    }
}

const deleteOperation = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await pool.query('DELETE FROM income_and_expenses WHERE id = $1', [id])
        response.rowCount == 1
            ? res.json(`Operación ${id} eliminada con éxito`)
            : res.json(`No existe una operacion el id ${id}`);

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getOperations,
    getByOperationId,
    createOperation,
    updateOperation,
    deleteOperation,
    getOperationsHome,
    getOperationsGraphic
}