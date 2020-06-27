"use strict";

import Datastore from "nedb-promises";

export class Note {
  constructor(
    title = "",
    content = "",
    due = null,
    importance = 0,
    state = 0,
    category = 0
  ) {
    this.title = title;
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
      db ||
      new Datastore({
        filename: "./data/notes.db",
        autoload: true,
        timestampData: true,
      });
  }

  async all() {
    let notes = await this.db.find({});
    const day = 1000 * 60 * 60 * 24;
    const now = new Date().getTime();

    let data = [];

    notes.forEach((note, index) => {
      const dif = now - new Date(note.createdAt).getTime();

      data.push({
        _id: note._id,
        title: note.title,
        content: note.content,
        due: note.due,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        importance: note.importance,
        state: note.state,
        category: note.category,
        age: Math.round(dif / day),
      });
    });

    return data;
  }

  async add(req) {
    const note = new Note(
      req.body.title,
      req.body.content,
      req.body.due,
      req.body.importance,
      req.body.state,
      req.body.category
    );

    return await this.db.insert(note);
  }

  async get(id) {
    return this.db.findOne({ _id: id });
  }

  async update(id, req) {
    console.log(req.body);

    return this.db.update({ _id: id }, { $set: req.body });
  }

  async delete(id) {
    return this.db.remove({ _id: id }, {});
  }
}

export const notesService = new NotesService();
