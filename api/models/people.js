/**
 * Map the scruture of the object to be manipulate on the database
 * @requires mongoose
 */

const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    age: {type: Number},
    balance: mongoose.Schema.Types.Decimal128,
    email: {type: String},
    address: {type: String}
});

module.exports = mongoose.model('People', peopleSchema);

