let mongoose = require('mongoose');

let notesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: "",
    },
    state: {
        type: Number,
        default: 0,
    },
    importance: {
        type: Number,
        default: 0
    },
    category: {
        type: Number,
        default: 0
    },
    due: {
        type: Date,
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });


let Notes = module.exports = mongoose.model('notes', notesSchema);

module.exports.get = function (callback, limit) {
    Notes.find(callback).limit(limit);
}