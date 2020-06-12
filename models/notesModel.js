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
},{
    timestamps: {
        createdAt: 'createdAt',
        fieldType: Number,
        currentTime: 202020,
    }
});


let Notes = module.exports = mongoose.model('notes', notesSchema);

module.exports.get = function (callback, limit) {
    Notes.find(callback).limit(limit);
}