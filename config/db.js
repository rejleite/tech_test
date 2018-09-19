var mongoose = require('mongoose'),
    property_db = require('./property_db');

// Connect to the MongoDb database
mongoose.Promise = global.Promise;

/**
 * Treat the db connection, case it occurs some error closes the db connection properly.
 */
module.exports = function(){

    mongoose.connect(property_db.url_conn.url, 
        {
            auth: {
            user: property_db.url_conn.user,
            password: property_db.url_conn.password
            },
            useNewUrlParser: true
        });
    
    mongoose.connection.on('connected', function(){
        console.log('Mongoose connection is open...');
    })

    mongoose.connection.on('error', function(error){
        console.log('Occur an error on the database ', error );
    })

    mongoose.connection.on('disconnected', function(){
        console.log('Mongoose connection is closed.');
    })

    var closeConn = function(){
        mongoose.connection.close(function(){
            console.log('Mongoose connection is closed due to application being interrupted.')
        })
    }
    // Case the application terminate unexpectedly closes the db connection.
    process.on('SIGINT', closeConn).on('SIGTERM', closeConn);
}

