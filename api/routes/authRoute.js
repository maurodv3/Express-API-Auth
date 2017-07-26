'use strict';

let express = require('express');
let router = express.Router();
let authController = require('../controllers/authController');
let auth = require('../../aaa/authMiddleware');

router.post('/auth', authController.auth);

router.post('/validate', auth.validate, authController.validate);
router.post('/validate/:token', auth.validate, authController.validate);

module.exports = router;