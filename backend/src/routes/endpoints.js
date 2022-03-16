const { Router } = require('express');
const
    {
        getOperations,
        getByOperationId,
        createOperation,
        updateOperation,
        deleteOperation,
        getOperationsHome,
        getOperationsGraphic
    } = require('../controllers/operations.controllers');
const { getUsers, createUser, getByUserId, updateUser, deleteUser, loginUser } = require('../controllers/users.controllers');

const router = Router();

// /api
router.get('/home', getOperationsHome);
router.get('/home/graphic', getOperationsGraphic); 

router.get('/operations', getOperations); 
router.get('/operation/:id', getByOperationId);
router.post('/operations', createOperation);
router.put('/operation/:id', updateOperation);
router.delete('/operation/:id', deleteOperation);

// /api
router.get('/users', getUsers);
router.get('/user/:id', getByUserId);
router.post('/users', createUser);
router.post('/user/login', loginUser);
// router.put('/user/:id', updateUser);
// router.delete('/user/:id', deleteUser);


module.exports = router;