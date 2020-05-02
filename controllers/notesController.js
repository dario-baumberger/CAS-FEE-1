Note = require('../models/notesModel');

exports.index = function (req, res) {
    Note.get(function (err, notes) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            notes
        });
    });
};

exports.new = function (req, res) {
    console.log(req.body)
    let note = new Note();
    note.title = req.body.title ? req.body.title : note.title;
    note.content = req.body.content;
    note.created = req.body.created;
    note.due = req.body.due;
// save the note and check for errors
    note.save(function (err) {
         if (err){
             res.json(err);
         }else{
             res.json({
                 message: 'New note created!',
                 data: note
             });
         }
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Note.findById(req.params.note_id, function (err, note) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: note
        });
    });
};

exports.update = function (req, res) {
    Note.findById(req.params.note_id, function (err, note) {
        if (err)
            res.send(err);
        note.title = req.body.title ? req.body.title : note.title;
        note.content = req.body.content;
        note.created = req.body.created;
        note.due = req.body.due;
// save the note and check for errors
        note.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: note
            });
        });
    });
};

exports.delete = function (req, res) {
    Note.remove({
        _id: req.params.note_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};