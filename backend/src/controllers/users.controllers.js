const pool = require('../db/database');
const jwt = require('jsonwebtoken');

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
    const { name, email, password } = req.body;

    if (!(email, password)) return res.status(400).json({
        message: "Debe completar los campos",
        state: false
    });
    try {

        const resp = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (resp.rows.length >= 1) {
            return res.status(400).json({ message: "Ya existe un usuario con ese email", state: false })
        }

        const text = 'INSERT INTO users(name, email, password ) VALUES($1, $2, $3) RETURNING *'
        const values = [name, email, password];
        const response = await pool.query(text, values);

        res.status(200).json({
            message: "Usuario creado con éxito",
            state: true
        })
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!(email, password)) return res.status(400).json({
        message: "Debe completar los campos",
        state: false
    });

    try {
        const resp = await pool.query(`
        SELECT user_id FROM users 
        WHERE email = $1 and password = $2`,
            [email, password]);

        if (resp.rows.length >= 1) {
            const idUser = resp.rows.map(u => u.user_id)[0]
            return res.status(200).json({ message: "Usario encontrado", state: true, user_id: idUser });
        } else {
            return res.status(400).json({ message: "Usario no encontrado", state: false });
        }
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
    deleteUser,
    loginUser
}