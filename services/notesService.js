import Datastore from "nedb-promises";

export class Note {
  constructor(
    title = "",
    created,
    updated,
    content = "",
    due = null,
    importance = 0,
    state = 0,
    category = 0
  ) {
    this.title = title;
    this.created = created;
    this.updated = updated;
    this.content = content;
    this.due = due;
    this.importance = importance;
    this.state = state;
    this.category = category;
  }
}

export class NotesService {
  constructor(db) {
    this.db =
      db || new Datastore({ filename: "./data/notes.db", autoload: true });
  }

  async all() {
    let notes = await this.db.find({});

    notes.forEach((note) => {
      const day = 1000 * 60 * 60 * 24;
      const dif = new Date(note.created).getTime() - new Date().getTime();
      console.log(dif / day);
    });

    return notes;
  }

  async add(req) {
    console.log("add");
    let note = new Note();

    note.title = req.body.title ? req.body.title : note.title;
    note.content = req.body.content;
    note.state = req.body.state;
    note.importance = req.body.importance;
    note.due = req.body.due;
    note.category = req.body.category;
    note.created = new Date();

    return await this.db.insert(note);
  }

  async get(id) {
    return this.db.findOne({ _id: id });
  }

  async update(req) {
    console.log(req.body._id);
    return this.db.update({ _id: req.body._id }, { $set: req.body });
  }

  async delete(id) {
    return this.db.remove({ _id: id }, {});
  }
}

export const notesService = new NotesService();
