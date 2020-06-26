import { NotesService } from "../services/notes.js";
import { TemplateController } from "./template.js";

export class ModalController {
  constructor() {
    this.template = new TemplateController();
    this.notesService = new NotesService();
    this.$modal = document.querySelector(".modal");
    this.$html = document.querySelector("html");
  }

  showModal() {
    this.$modal.classList.add("modal--open");
    this.$html.classList.add("has-open-modal");
  }

  closeModal() {
    this.$modal.classList.remove("modal--open");
    this.$html.classList.remove("has-open-modal");
    this.clearModal();
  }

  clearModal() {
    this.$modal.innerHTML = "";
  }

  async initEventHandlers() {
    window.addEventListener("click", async (event) => {
      if (event.target.matches(".js-modal--edit")) {
        const id = event.target.closest(".note").dataset.id;
        this.notesService.getNote(id).then((data) => {
          this.template.renderTemplate(
            { title: "Edit" },
            "modalcontent",
            ".modal"
          );
          let due = data.due;

          if (due !== undefined) {
            due = new Date(due);
            due =
              due.getFullYear() +
              "-" +
              ("0" + (due.getMonth() + 1)).slice(-2) +
              "-" +
              ("0" + due.getDate()).slice(-2);
          }

          const ret = {
            title: data.title,
            note: data.content,
            id: data.id,
            category: data.category,
            importance: data.importance,
            state: data.state,
            due: due,
          };

          this.template.renderTemplate(ret, "form", ".modal__template");
          this.showModal();
        });
      } else if (event.target.matches(".js-modal--filter")) {
        const filterStates = localStorage.getItem("filterStates").split(",");
        const filterCategories = localStorage
          .getItem("filterCategories")
          .split(",");

        const data = {
          categories: {
            cat0: filterCategories.includes("0"),
            cat1: filterCategories.includes("1"),
            cat2: filterCategories.includes("2"),
            cat3: filterCategories.includes("3"),
          },
          states: {
            state0: filterStates.includes("0"),
            state1: filterStates.includes("1"),
            state2: filterStates.includes("2"),
          },
        };

        this.template.renderTemplate(
          { title: "Filter" },
          "modalcontent",
          ".modal"
        );
        this.template.renderTemplate(data, "filter", ".modal__template");
        this.showModal();
      } else if (event.target.matches(".js-modal--add")) {
        this.template.renderTemplate(
          { title: "Add" },
          "modalcontent",
          ".modal"
        );
        this.template.renderTemplate(
          { title: "", note: "" },
          "form",
          ".modal__template"
        );
        this.showModal();
      }
    });

    this.$modal.addEventListener("click", (event) => {
      if (event.target.matches(".modal__close")) {
        this.closeModal();
      }
    });
  }

  async init() {
    await this.initEventHandlers();
  }
}
