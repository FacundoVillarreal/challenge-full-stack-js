const Users = require('../models/Users');

const getUsers = async (req, res) => {
    const response = await Users.findAll({
        attributes: ['name', 'email', "password", "user_id"]
    })
    .catch(err => {
        console.log(err);
    })
    res.json(response);
}

const createUser = async (req, res) => {
    const {name, email, password } = req.body;

    if (!(email, password)) return res.status(400).json({
        message: "Debe completar los campos",
        state: false
    });

    const response = await Users.findAll({
        attributes: ["email", "password"],
        where: {
            email
        }
    })

    if (response.length >= 1) {
        return res.status(400).json({ message: "Ya existe un usuario con ese email", state: false })
    }
        const resp = await Users.create({
            email,
            password,
        }, {
            fields: ["email", "password"]
        })
        
        res.status(200).json({
            message: "Usuario creado con éxito",
            state: true
        })
}

const loginUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!(email, password)) return res.status(400).json({
        message: "Debe completar los campos",
        state: false
    });

    const response = await Users.findAll({
        attributes: ["user_id"],
        where: {
            email,
            password
        }
    }).catch(err => {
        console.log(err)
    })

    if (response.length >= 1) {
        const idUser = response.map(u => u.user_id)[0]

        return res.status(200).json({ message: "Usario encontrado", state: true, user_id: idUser });

    } else {
        return res.status(400).json({ message: "Usario no encontrado", state: false });
    }
}

module.exports = {
    getUsers,
    createUser,
    loginUser
}