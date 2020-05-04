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
        default: 0,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    importance: {
        type: String,
        default: 0
    },
    categories: {
        type: Array,
    },
    due: {
        type: Date,
    }
});


let Notes = module.exports = mongoose.model('notes', notesSchema);

module.exports.get = function (callback, limit) {
    Notes.find(callback).limit(limit);
}