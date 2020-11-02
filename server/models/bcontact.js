let mongoose = require('mongoose');

// crearte a model class
let contactModel = mongoose.Schema({
    name: String,
    Email: String,
    phone: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('Contact', contactModel);