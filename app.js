let express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    errorHandler = require('./error/errorHandler');

// models
let User = require('./api/models/userModel');

// database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://192.168.99.100:32769/bbbaaa', { useMongoClient: true });

// routes
let userRoutes = require('./api/routes/userRoute'),
    authRoutes = require('./api/routes/authRoute');

// init app
let app = express();
app.use(logger(':method :status :response-time ms - :url'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// init routes
app.use('/v1', authRoutes);
app.use('/v1', userRoutes);

// error handling
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler.handleErrors);

module.exports = app;
