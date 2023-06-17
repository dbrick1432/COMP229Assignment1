let mongoose = require('mongoose');

//create a model class
let contactModel = mongoose.Schema ({
    username: String,
    email: String,
    password: String
},
{
    collection: 'contacts'
}
);

module.exports = mongoose.model('Contact', contactModel);