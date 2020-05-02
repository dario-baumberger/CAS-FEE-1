let mongoose = require('mongoose');

let notesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        required: true
    },
    categories: {
        type: Array,
    },
    due: {
        type: Date,
    },
    created: {
        type: Date,
        default: Date.now
    }
});


let Notes = module.exports = mongoose.model('notes', notesSchema);

module.exports.get = function (callback, limit) {
    Notes.find(callback).limit(limit);
}