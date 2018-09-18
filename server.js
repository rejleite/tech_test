/** 
 * Server.js
 * Configure the application server with the required modules.
 * Uses @requires Express : web framework
 *      @requires Mongoose : ORM for mongoDB
 *      @requires Express-Validator : midlleware to validating the data 
 *      @requires BodyParser : middleware to get information sent through post actions 
 * 
*/

var express = require('express'),
    mongoose = require('mongoose'),
    validator = require('express-validator'),
    bodyParser = require('body-parser');

// Initialize the application
app = express();

// middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware for validations
app.use(validator());

// Connect to the MongoDb database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/app', { useNewUrlParser: true });

// load models
var peopleModel = require('./api/models/people');  

// load routes
var routes = require('./api/routes/routesConfig');
routes(app);

// Middleware to check if the URL is right and send a better message to user
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

// Sets the port that server will be listening, if not defined uses the default port
port = process.env.PORT || 8080;

// Start listen the application on the port specified
app.listen(port);
console.log('Server running on port: ' + port);
