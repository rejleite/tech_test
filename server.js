/** 
 * Server.js
 * Configure the application server with the required modules.
 * Uses @requires app : app configuration
 * 
*/

var app = require('./config/app')

// Sets the port that server will be listening, if not defined uses the default port
port = process.env.PORT || 8080;

// Start listen the application on the port specified
app.listen(port);
console.log('Server running on port: ' + port);
