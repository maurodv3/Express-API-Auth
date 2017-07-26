'use strict';

let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.index({name: "text", role: "text"});
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);