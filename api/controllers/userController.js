'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.list_all = function(req, res) {

    let page = Number(req.query.page).valueOf() || 1,
        limit = Number(req.query.result).valueOf() || 10;

    User.paginate({}, { page: page, limit: limit }, function(err, results) {
        if (err) {
            res.send(err);
        }
        res.json(results);
    });
};

exports.create = function(req, res) {
    let new_user = new User(req.body);
    new_user.save(function(err, entity) {
        if (err) {
            res.send(err);
        }
        res.json(entity);
    });
};

exports.read = function(req, res) {
    User.findById(req.params.id, function(err, entity) {
        if (err) {
            res.send(err);
        }
        res.json(entity);
    });
};

exports.update = function(req, res) {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, entity) {
        if (err) {
            res.send(err);
        }
        res.json(entity);
    });
};

exports.delete = function(req, res) {
    User.remove({_id: req.params.id}, function(err, entity) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Provider successfully deleted' });
    });
};

