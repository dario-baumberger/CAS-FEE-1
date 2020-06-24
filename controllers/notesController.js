const Note = require("../models/notesModel");

exports.index = function (req, res) {
  Note.find({}, function (err, data) {
    let notes = [];
    let now = new Date();

    data.forEach(function (note) {
      let created = new Date(note.created);
      let age = Math.floor(
        (now.getTime() - created.getTime()) / (1000 * 3600 * 24)
      );
      let updated = new Date(note.updated);
      let due = note.due;

      console.log(due);

      if (due !== undefined || due !== "" || due !== null) {
        due = new Date(due);
        due =
          due.getDate() + "." + (due.getMonth() + 1) + "." + due.getFullYear();
      }

      created =
        created.getDate() +
        "." +
        (created.getMonth() + 1) +
        "." +
        created.getFullYear() +
        " " +
        created.getHours() +
        ":" +
        created.getMinutes() +
        ":" +
        created.getSeconds();
      updated =
        updated.getDate() +
        "." +
        (updated.getMonth() + 1) +
        "." +
        updated.getFullYear() +
        " " +
        updated.getHours() +
        ":" +
        updated.getMinutes() +
        ":" +
        updated.getSeconds();

      notes.push({
        id: note._id,
        title: note.title,
        created: created,
        updated: updated,
        content: note.content,
        due: due,
        importance: note.importance,
        state: note.state,
        category: note.category,
        age: age,
      });
    });

    //
    //const
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }

    res.json(notes);
  });
};

exports.new = function (req, res) {
  let note = new Note();

  note.title = req.body.title ? req.body.title : note.title;
  note.content = req.body.content;
  note.state = req.body.state;
  note.importance = req.body.importance;
  note.due = req.body.due;
  note.category = req.body.category;

  note
    .save()
    .then((item) => {
      res.send("item saved to database");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// Handle view contact info
exports.view = function (req, res) {
  Note.findById(req.params.note_id, function (err, note) {
    if (err) {
      res.send(err);
    }
    const now = Date.now();
    let notes = {};
    const diffTime = now - note.created;
    notes.id = note._id;
    notes.title = note.title;
    notes.created = note.createdAt;
    notes.updated = note.updatedAt;
    notes.content = note.content;
    notes.importance = note.importance;
    notes.state = note.state;
    notes.due = note.due;
    notes.category = note.category;
    notes.now = now;
    notes.age = diffTime;

    res.json(notes);
  });
};

exports.update = function (req, res) {
  Note.findById(req.params.note_id, function (err, note) {
    if (err) {
      res.send(err);
    }
    note.title = req.body.title ? req.body.title : note.title;
    note.content = req.body.content;
    note.created = req.body.created;
    note.due = req.body.due;
    note.state = req.body.state;

    console.log(req.body);

    note.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "note Info updated",
        data: note,
      });
    });
  });
};

exports.delete = function (req, res) {
  Note.remove(
    {
      _id: req.params.note_id,
    },
    function (err, note) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "note deleted",
      });
    }
  );
};
