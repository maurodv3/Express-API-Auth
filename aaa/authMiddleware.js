'use strict';

let tokenUtil = require('../api/utils/tokenUtil');

exports.validate = function(req, res, next) {

    let token = tokenUtil.getTokenFromHeaders(req);

    tokenUtil.validate(token, function (err, decoded) {

        if (err) {
            err.name = 'UnauthorizedError';
            next(err);
            return;
        }

        req.identity = {
            username: decoded.user,
            role: decoded.role
        };

        next();

    });
};