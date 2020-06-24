import { NotesService } from "../services/notes.js";
import { Template } from "../controllers/template.js";
import { Modal } from "../controllers/modal.js";

export class Notes {
  constructor(socket) {
    this.template = new Template();
    this.modal = new Modal();
    this.$notes = document.querySelector(".notes");
    this.socket = socket;
    this.notesService = new NotesService();
    this.notes = [];

    /*this.observer = new Observable((observer) => {
      setTimeout(() => {
        observer.next("got data!");
        observer.complete();
      }, 1000);
    });
    this.observer.subscribe(this.notes);*/
    /*this.obs = new Observable(this.notes, (changes) => {
      changes.forEach(function (change) {
        // Letting us know what changed
        console.log(change.type, change.name, change.oldValue);
      });
    });*/
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

  noteDelete() {
    event.preventDefault();
    const id = document.getElementById("id").value;
    this.notesService.deleteNote(id).then((data) => {
      if (data.status === "success") {
        this.notesService.getNotes().then((data) => {
          this.notes = data;
          this.renderNotes();
          this.modal.modalClose();
        });
      }
    });
  }

  noteState(state) {
    let content = event.target.parentNode;
    let note = content.parentNode;
    let listEl = note.parentNode;
    let id = listEl.dataset.id;
    listEl.classList.add("note--removed");
    this.notesService.updateState(id, state).then((data) => {
      this.notesService.getNotes().then((data) => {
        this.notes = data;
        this.renderNotes();
        this.modal.modalClose();
      });
    });
  }

  noteUpdate() {
    const data = this.noteGetData();

    console.log(data);

    this.notesService.updateNote(data).then((data) => {
      this.notesService.getNotes().then((data) => {
        this.notes = data;
        this.renderNotes();
        this.renderNotes();
        this.modal.modalClose();
      });
    });
  }

  noteFilter() {
    this.notesService.getNotes().then((data) => {
      this.notes = data;
      const filterCategories = this.getFilterData("filter-categories");
      const filterStates = this.getFilterData("filter-states");

      console.log(filterCategories);

      this.notes = this.notes.filter((obj) => {
        let inCategories = false;
        let inStates = false;

        if (filterCategories.length) {
          inCategories = filterCategories.some((x) => {
            console.log(
              "cat",
              obj.title,
              obj.category,
              parseInt(x),
              parseInt(x) === obj.category
            );
            return parseInt(x) === obj.category;
          });
        }

        if (filterStates.length) {
          inStates = filterStates.some((x) => {
            console.log(
              "state",
              obj.title,
              obj.state,
              parseInt(x),
              parseInt(x) === obj.state
            );
            return parseInt(x) === obj.state;
          });
        }

        console.log(
          inStates,
          inCategories,
          ![inStates, inCategories].some((x) => x === false)
        );

        console.log("-----------");

        return ![inStates, inCategories].some((x) => x === false);
      });
      this.renderNotes();
      this.modal.modalClose();
    });
  }

  noteSort() {
    this.notes.sort(function (a, b) {
      return a.importance - b.importance;
    });
    this.renderNotes();
  }

  getFilterData(name) {
    const oRadio = document.forms[0].elements[name];
    let ret = [];

    for (let i = 0; i < oRadio.length; i++) {
      if (oRadio[i].checked) {
        ret.push(oRadio[i].value);
      }
    }

    return ret;
  }

  noteGetData() {
    const title = document.getElementById("title").value;
    const note = document.getElementById("note").value;
    const state = document.getElementById("state").value;
    const category = document.getElementById("category").value;
    const due = document.getElementById("due").value;
    const importance = document.getElementById("importance").value;
    const id = document.getElementById("id").value;

    const data = {
      _id: id,
      title: title,
      content: note,
      state: state,
      category: category,
      importance: importance,
      due: due,
    };

    return data;
  }

  noteAdd() {
    event.preventDefault();
    const data = this.noteGetData();

    console.log(data);

    this.notesService.addNote(data).then((data) => {
      console.log(data);
      this.notesService.getNotes().then((data) => {
        this.notes = data;
        this.renderNotes();
        this.modal.modalClose();
      });
    });
  }

  initEventHandlers() {
    this.$notes.addEventListener("click", (event) => {
      if (event.target.matches(".js-note--done")) {
        this.noteState(2);
      }
      if (event.target.matches(".js-note--progress")) {
        this.noteState(1);
      }
    });

    window.addEventListener("submit", (event) => {
      if (event.target.matches("#form-data")) {
        event.preventDefault();
        this.noteAdd();
      }
    });

    window.addEventListener("change", (event) => {
      if (event.target.matches(".js-note--sort")) {
        event.preventDefault();
        this.noteSort("importance");
      }
    });

    window.addEventListener("click", (event) => {
      if (event.target.matches(".js-note--delete")) {
        this.noteDelete();
      }

      if (event.target.matches(".js-note--save")) {
        event.preventDefault();
        this.noteUpdate();
      }

      if (event.target.matches(".js-note--filter")) {
        event.preventDefault();
        this.noteFilter();
      }
    });
  }

  init() {
    this.initEventHandlers();

    this.notesService.getNotes().then((data) => {
      this.notes = data;
      this.renderNotes();
    });
  }
}
