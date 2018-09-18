/** 
 * Configure the routes according to HTTP Verb 
 *  @param {Function} [callback]
 *
 */

module.exports = function(app){
    var PeopleController = require('../controllers/peopleController');
    app.route('/')
        .get(PeopleController.welcome);

     app.route('/people')
        .get(PeopleController.list_all)
        .post(PeopleController.insert);
        
    app.route('/people/:id')
        .get(PeopleController.list_by_id)
        .put(PeopleController.update_a_people);
}

