const Operations = require('../models/Operations');

const getOperations = async (req, res) => {
    const { userId } = req.params;
    const response = await Operations.findAll({
        where: { user_id: userId },
        order: [
            ['id', 'ASC']
        ]
    })
    .catch(err => {
        console.log(err)
    })
    res.json(response);
}

const getByOperationId = async (req, res) => {
    const { id, userId } = req.params;
    
    const response = await Operations.findOne({
        where: { user_id: userId, id: id }
    })
    .catch(err => {
        console.log(err)
    })
    res.json(response);
}

const getOperationsHome = async (req, res) => {
    const { userId } = req.params;
    const response = await Operations.findAll({
        where: { user_id: userId },
        order:[ 
            ['id', 'ASC']
        ],
        limit: 10
    })
    .catch(err => {
        console.log(err)
    })
    res.json(response);
}

const getOperationsGraphic = async (req, res) => {
    const { userId } = req.params;

    const response = await Operations.findAll({
        attributes: ["tipo", "monto"],
        where: { user_id: userId }
    })
    .catch(err => {
        console.log(err);
    })
    res.json(response);
}

const createOperation = async (req, res) => {
    const { concepto, monto, fecha, tipo, user_id } = req.body;
    const response = await Operations.create({
        concepto,
        monto,
        fecha,
        tipo,
        user_id
    }, {
        fields: ['concepto', 'monto', 'fecha', 'tipo', "user_id"]
    })
    .catch(err => {
        res.status(400).json({
            message: "Operación rechazada",
            error: err
        })
    })
    res.status(200).json({
        message: "Operación creada con éxito"
    })

}

const updateOperation = async (req, res) => {
    const { id } = req.params;
    const { concepto, monto, fecha, tipo, user_id } = req.body;
    const response = await Operations.update({
        concepto,
        monto,
        fecha,
        tipo,
        user_id
    }, {
        where: {
            id: id
        }
    })
    .catch(err =>{
        console.log(err)
    })
    res.status(200).json({
        message: "Operación actualizada con éxito"
    })
}

const deleteOperation = async (req, res) => {
    const { id } = req.params;
    const response = await Operations.destroy({
        where: {
            id
        }
    })
    .catch(err => {
        res.json(`No existe una operacion el id ${id}`);
    })
    res.json(`Operación ${id} eliminada con éxito`);
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
