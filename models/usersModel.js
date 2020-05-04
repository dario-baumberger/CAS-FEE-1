let mongoose = require('mongoose');

let usersSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
});


let Users = module.exports = mongoose.model('users', usersSchema);

module.exports.get = function (callback, limit) {
    Users.find(callback).limit(limit);
}