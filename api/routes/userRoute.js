'use strict';

let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');

let auth = require('../../aaa/authMiddleware');

let guard = require('express-jwt-permissions')({
    requestProperty: 'identity',
    permissionsProperty: 'role'
});

router.use(auth.validate);

router.get('/users', guard.check('admin:read'), userController.list_all);
router.post('/users', guard.check('admin:write'), userController.create);

router.get('/users/:id', guard.check('admin:read'), userController.read);
router.put('/users/:id', guard.check('admin:write'), userController.update);
router.delete('/users/:id', guard.check('admin:write'), userController.delete);

module.exports = router;
