const { Router } = require('express');
const
    {
        getOperations,
        getByOperationId,
        createOperation,
        updateOperation,
        deleteOperation
    } = require('../controllers/operations.controllers');
const { getUsers, createUser, getByUserId, updateUser, deleteUser } = require('../controllers/users.controllers');

const router = Router();

// /api
router.get('/operations', getOperations); 
router.get('/operation/:id', getByOperationId);
router.post('/operations', createOperation);
router.put('/operation/:id', updateOperation);
router.delete('/operation/:id', deleteOperation);

// /api
router.get('/users', getUsers);
router.get('/user/:id', getByUserId);
router.post('/users', createUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);


module.exports = router;