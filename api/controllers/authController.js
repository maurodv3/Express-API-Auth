'use strict';

let tokenUtil = require('../utils/tokenUtil'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.auth = function(req, res, next) {

    let username = req.body.username,
        password = req.body.password;

    User.findOne({username: username, password: password}, function(err, user) {

        if (user) {

            let userData = {
                user: user.username,
                role: user.role
            };

            tokenUtil.generate(userData, function(err, token) {

                if (err) {
                    next(err);
                    return;
                }

                res.json({ token: token });

            });

        } else {

            res.status(401).json({ message: 'invalid username and/or password.'});
        }
    });
};

exports.validate = function(req, res, next) {

    let token = tokenUtil.getTokenFromParams(req);

    tokenUtil.validate(token, function (err, decoded) {

        if (err) {
            err.name = 'UnauthorizedError';
            next(err);
            return;
        }

        res.json(decoded);

    });


};