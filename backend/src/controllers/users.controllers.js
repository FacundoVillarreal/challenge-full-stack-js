const pool = require('../db/database');

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    res.json(response.rows);
}

const getByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error)
    }
}

const createUser = async (req, res) => {
    const { name, email, password} = req.body;

    try {
        const text = 'INSERT INTO users(name, email, password ) VALUES($1, $2, $3) RETURNING *'
        const values = [name, email, password];
        const response = await pool.query(text, values);

        res.status(200).json({
            message: "Usuario creado con éxito"
        })

        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;


    try {
        const text = 'UPDATE users SET name = $1 , email = $2, password = $3 WHERE user_id = $4'
        const values = [name, email, password, id]

        const response = await pool.query(text, values);
        res.status(200).json({
            message: "Usuario actualizado con éxito"
        })
        console.log(response.rowCount)
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await pool.query('DELETE FROM users WHERE user_id = $1', [id])
        response.rowCount == 1
            ? res.json(`Usuario ${id} eliminado con éxito`)
            : res.json(`No existe un usuario con el id ${id}`);

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUsers,
    getByUserId,
    createUser,
    updateUser,
    deleteUser
}