'use strict';

let jwt = require('jsonwebtoken');
let fs = require('fs');
const key = fs.readFileSync('security/private.key');
const cert = fs.readFileSync('security/cert.crt');

exports.generate = function(data, callback) {
    try {
        callback(null, jwt.sign(data, key, { algorithm: 'RS256'}));
    } catch (err) {
        console.log('WARN - ', err.message);
        callback(err, null);
    }
};

exports.validate = function(token, callback) {
    try {
        callback(null, jwt.verify(token, cert, { algorithms: ['RS256']}));
    } catch (err) {
        console.log('WARN - ', err.message);
        callback(err, null);
    }
};

exports.getTokenFromHeaders = function(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else {
        return '';
    }
};

exports.getTokenFromParams = function(req) {
    if (req.params && req.params.token) {
        return req.params.token;
    } else {
        return '';
    }
};