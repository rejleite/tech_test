/**
 * Configure the application
 *      @requires Express: web framework
 *      @requires Mongoose : ODM for mongoDB
 *      @requires Express-Validator : midlleware to validating the data 
 *      @requires BodyParser : middleware to get information sent through post actions 
 * 
 */
var express = require('express'),
    validator = require('express-validator'),
    bodyParser = require('body-parser'),
    db = require('./db'),
    jwt = require('jsonwebtoken'),
    bcryptjs = require('bcryptjs'),
    config = require('./config');

// Initialize the application
app = express();

// middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware for validations
app.use(validator());

// load models
var peopleModel = require('../api/models/people');  

// load routes
var routes = require('../api/routes/routesConfig');
app.use('/app', routes);

// Middleware to check if the URL is right and send a better message to user
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

// Starts the db connection
db();

module.exports = app;