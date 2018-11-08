/** 
 * Configure the routes according to HTTP Verb 
 * @requires express, peopleController
 * 
 */

var express = require('express');
var peopleRouter = express.Router();
var PeopleController = require('../controllers/peopleController');

peopleRouter.route('/people')
    .get(PeopleController.list_all)
    .post(PeopleController.insert);

peopleRouter.route('/people/:peopleId')
    .get(PeopleController.list_by_id)
    .put(PeopleController.update_a_people);

module.exports = peopleRouter;

