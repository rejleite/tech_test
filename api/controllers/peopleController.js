/**
 * Validate and do the API operations
 * @requires mongoose
 * 
 */ 

const mongoose = require('mongoose'),
    People = mongoose.model('People');

/**
 * Inform the user about the webapi. 
 * Access through @api {get} /
 * @returns json object with a message
 */
module.exports.welcome = function(req, res){
    res.status(201).json({Welcome: "Welcome to webapi. To access all functionalites check the information on Readme.md file."})
}

/**
 * Add a People object into the database.
 * Access through @api {post} /people
 * @returns json object according to the result of the operation
 *          If error returns {error: err}
 *          else returns the id of the object added {id: record._id}  
 */
module.exports.insert = function(req, res){
    var data = req.body;

    /* Check if the name was informed. A Person should have at least a name. */
    req.assert('name', 'Name should be informed').notEmpty();

    var errors = req.validationErrors();
    if(errors)
        res.status(500).json({error: errors, people: data});
      
    var newPeople = new People(data);

    newPeople.save(function(err, record){
        if (err){
            console.log(err);
            res.status(500).json({error: err});
        }
        
        res.status(201).json({id: record._id});
    });
};

/**
 * List all records of People collection
 * Access through @api {get} /people
 * @returns json object according to the result of the operation
 *          If error returns {error: err}
 *          else returns the list of the objects 
 */
module.exports.list_all = function(req, res){
    People.find({}, function(err, records){
        if(err){
            console.log(err);
            res.status(500).json({error: err});
        } else {
            res.status(201).json(records);
        }
    });
};

/**
 * List all records of People collection
 * Access through @api {get} /people/:id
 * @returns json object according to the result of the operation
 *          If error returns {error: err}
 *          else returns the list of the objects 
 */
module.exports.list_by_id = function(req, res){
    People.findById(req.params.id, function(err, records){
        if(err){
            console.log(err);
            res.status(500).json({error: err});
        } else {
            res.status(201).json(records);
        }
    });
}

/**
 * Update an object of People collection
 * Access through @api {put} /people/:id
 * @returns json object according to the result of the operation
 *          If error returns {error: err}
 *          else returns the list of the objects 
 */
module.exports.update_a_people = function(req, res) {
    // Find a people record by id and update
    People.findOneAndUpdate(
            {_id: req.params.id}, req.body,
            {new: true}, //true to return the object updated
            function(err, record) {
                if(err){
                    console.log(err);
                    res.status(500).json({error: err});
                } else {
                    res.status(201).json(record);
                }
            }
        );
  };
