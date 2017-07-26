'use strict';

let tokenUtil = require('../api/utils/tokenUtil');

function validate(req, res, next) {

    let token = tokenUtil.getTokenFromHeaders(req);

    tokenUtil.validate(token, function (err, decoded) {

        if (err) {
            err.name = 'UnauthorizedError';
            next(err);
            return;
        }

        next();

    });
}

module.exports = {
    validate: validate
};