var mongoose = require('mongoose');
    
// Connect to the MongoDb database
mongoose.Promise = global.Promise;

/**
 * Treat the db connection, case it occurs some error closes the db connection properly.
 */
module.exports = function(){

    mongoose.connect(process.env.DB_CONN, 
        {
            auth: {
                user: process.env.USERDB,
                password: process.env.PWDB
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

