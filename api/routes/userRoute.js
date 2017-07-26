'use strict';

let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');

router.get('/users', userController.list_all);
router.post('/users', userController.create);

router.get('/users/:id', userController.read);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

module.exports = router;
