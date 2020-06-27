"use strict";

import { NotesService } from "../services/notes.js";
import { TemplateController } from "../controllers/template.js";
import { ModalController } from "../controllers/modal.js";

export class NotesController {
  constructor() {
    this.template = new TemplateController();
    this.modal = new ModalController();
    this.notesService = new NotesService();
    this.$notes = document.querySelector(".notes");
    this.notes = [];
  }

  clearNotes() {
    document.querySelectorAll(".note").forEach((n) => n.remove());
  }

  renderNotes() {
    this.clearNotes();
    this.notes.forEach((note) =>
      this.template.renderTemplate(note, "note", ".notes__list")
    );
  }

  deleteNote() {
    event.preventDefault();
    const id = document.getElementById("id").value;
    this.notesService.deleteNote(id).then(() => {
      this.filterNotes();
    });
  }

  updateNoteState(state) {
    const id = event.target.parentNode.parentNode.parentNode.dataset.id;

    this.notesService.updateState(id, state).then(() => {
      this.notesService.getNotes().then((data) => {
        this.notes = data;
        this.renderNotes();
      });
    });
  }

  updateNote() {
    const data = this.getNoteFormData();

    this.notesService.updateNote(data).then(() => {
      this.notesService.getNotes().then((data) => {
        this.notes = data;
        this.filterNotes();
      });
    });
  }

  filterNotes(
    filterStates = localStorage.getItem("filterStates").split(","),
    filterCategories = localStorage.getItem("filterCategories").split(","),
    filterImportances = localStorage.getItem("filterImportances").split(",")
  ) {
    this.notesService.getNotes().then((data) => {
      this.notes = data;

      this.notes = this.notes.filter((obj) => {
        let inCategories = false;
        let inStates = false;
        let inImportances = false;

        if (filterCategories.length) {
          inCategories = filterCategories.some((x) => {
            return x === obj.category;
          });
        }

        if (filterStates.length) {
          inStates = filterStates.some((x) => {
            return x === obj.state;
          });
        }

        if (filterImportances.length) {
          inImportances = filterImportances.some((x) => {
            return x === obj.importance;
          });
        }

        return ![inStates, inCategories, inImportances].some(
          (x) => x === false
        );
      });
      this.noteSort();
      this.modal.closeModal();
    });
  }

  noteSort(logic = localStorage.getItem("sort")) {
    if (logic === "importanceASC") {
      this.notes.sort(function (a, b) {
        return b.importance - a.importance;
      });
    } else if (logic === "importanceDESC") {
      this.notes.sort(function (a, b) {
        return a.importance - b.importance;
      });
    } else if (logic === "stateASC") {
      this.notes.sort(function (a, b) {
        return b.state - a.state;
      });
    } else if (logic === "stateDESC") {
      this.notes.sort(function (a, b) {
        return a.state - b.state;
      });
    } else if (logic === "titleASC") {
      this.notes.sort(function (a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      });
    } else if (logic === "titleDESC") {
      this.notes.sort(function (a, b) {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
        return 0;
      });
    } else if (logic === "createdASC") {
      this.notes.sort(function (a, b) {
        return new Date(b.created) - new Date(a.created);
      });
    } else if (logic === "createdDESC") {
      this.notes.sort(function (a, b) {
        return new Date(a.created) - new Date(b.created);
      });
    } else if (logic === "updatedASC") {
      this.notes.sort(function (a, b) {
        return new Date(b.updated) - new Date(a.updated);
      });
    } else if (logic === "updatedDESC") {
      this.notes.sort(function (a, b) {
        return new Date(a.updated) - new Date(b.updated);
      });
    } else if (logic === "dueASC") {
      this.notes.sort(function (a, b) {
        return new Date(b.due) - new Date(a.due);
      });
    } else if (logic === "dueDESC") {
      this.notes.sort(function (a, b) {
        return new Date(a.due) - new Date(b.due);
      });
    } else {
      this.notes.sort(function (a, b) {
        return new Date(a.created) - new Date(b.created);
      });
    }

    this.renderNotes();
  }

  setFilters() {
    localStorage.setItem(
      "filterStates",
      this.getFilterData("filter-states").toString()
    );

    localStorage.setItem(
      "filterCategories",
      this.getFilterData("filter-categories").toString()
    );
    localStorage.setItem(
      "filterImportances",
      this.getFilterData("filter-importances").toString()
    );
  }

  getFilterData(name) {
    const filter = document.forms[0].elements[name];
    let ret = [];

    for (let i = 0; i < filter.length; i++) {
      if (filter[i].checked) {
        ret.push(filter[i].value);
      }
    }

    return ret;
  }

  getNoteFormData() {
    return {
      title: document.getElementById("title").value,
      content: document.getElementById("note").value,
      state: document.getElementById("state").value,
      category: document.getElementById("category").value,
      due: document.getElementById("due").value,
      importance: document.getElementById("importance").value,
      _id: document.getElementById("id").value,
    };
  }

  addNote() {
    event.preventDefault();
    const data = this.getNoteFormData();
    this.notesService.addNote(data).then((data) => {
      this.filterNotes();
    });
  }

  initEventHandlers() {
    this.$notes.addEventListener("click", (event) => {
      if (event.target.matches(".js-note--done")) {
        this.updateNoteState(2);
      }
      if (event.target.matches(".js-note--progress")) {
        this.updateNoteState(1);
      }
    });

    window.addEventListener("submit", (event) => {
      if (event.target.matches("#form-data")) {
        event.preventDefault();
        this.addNote();
      }
    });

    window.addEventListener("change", (event) => {
      if (event.target.matches(".js-note--sort")) {
        event.preventDefault();
        localStorage.setItem("sort", event.target.value);
        this.noteSort(event.target.value);
      }
    });

    window.addEventListener("click", (event) => {
      if (event.target.matches(".js-note--delete")) {
        event.preventDefault();
        this.deleteNote();
      }

      if (event.target.matches(".js-note--save")) {
        event.preventDefault();
        this.updateNote();
      }

      if (event.target.matches(".js-note--filter")) {
        event.preventDefault();
        this.setFilters();
        this.filterNotes();
      }
    });
  }

  init() {
    this.initEventHandlers();
    const filterStates = [0, 1];
    const filterCategories = [0, 1, 2, 3];
    const filterImportances = [0, 1, 2, 3];

    if (localStorage.getItem("filterStates") === null) {
      localStorage.setItem("filterStates", filterStates.toString());
    }

    if (localStorage.getItem("filterCategories") === null) {
      localStorage.setItem("filterCategories", filterCategories.toString());
    }
    if (localStorage.getItem("filterImportances") === null) {
      localStorage.setItem("filterImportances", filterImportances.toString());
    }

    if (localStorage.getItem("sort") === null) {
      localStorage.setItem("sort", "dueDESC");
    }

    this.filterNotes();
  }
}
