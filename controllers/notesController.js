import { notesService } from "../services/notesService";

export class NotesController {
  async all(req, res) {
    res.json((await notesService.all()) || ["asd"]);
  }

  async add(req, res) {
    res.json((await notesService.add(req)) || []);
  }

  async get(req, res) {
    res.json((await notesService.get(req.params.id)) || []);
  }

  async update(req, res) {
    res.json((await notesService.update(req)) || []);
  }

  async delete(req, res) {
    res.json((await notesService.delete(req.params.id)) || []);
  }
}

export const notesController = new NotesController();
