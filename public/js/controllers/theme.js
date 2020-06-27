"use strict";

export class ThemeController {
  constructor() {
    this.$html = document.querySelector("html");
    this.$logo = document.querySelector(".logo img");
    this.$toggles = document.querySelectorAll(".js-theme--toggle");
    this.dark = this.getMode();
    this.setTheme();
    this.setLogo();
    this.saveMode();
  }

  setTheme() {
    if (this.dark) {
      this.$html.classList.add("theme-dark");
      document
        .querySelector(".js-theme-toggle-light")
        .parentNode.classList.remove("hidden");
      document
        .querySelector(".js-theme-toggle-dark")
        .parentNode.classList.add("hidden");
    } else {
      this.$html.classList.remove("theme-dark");
      document
        .querySelector(".js-theme-toggle-dark")
        .parentNode.classList.remove("hidden");
      document
        .querySelector(".js-theme-toggle-light")
        .parentNode.classList.add("hidden");
    }
  }

  toggleTheme() {
    [].forEach.call(this.$toggles, function (toggle) {
      toggle.parentNode.classList.toggle("hidden");
    });
    this.$html.classList.toggle("theme-dark");
    this.dark = !this.dark;
    this.setLogo();
    this.saveMode();
  }

  setLogo() {
    if (this.dark) {
      this.$logo.src = "/images/todo-logo-negative.png";
    } else {
      this.$logo.src = "/images/todo-logo.png";
    }
  }

  saveMode() {
    localStorage.setItem("theme-dark", this.dark);
  }

  getMode() {
    let ret = JSON.parse(localStorage.getItem("theme-dark"));

    if (ret === null) {
      ret = false;
    }

    return ret;
  }

  initEventHandlers() {
    window.addEventListener("click", async (event) => {
      if (event.target.matches(".js-theme--toggle")) {
        this.toggleTheme();
      }
    });
  }

  init() {
    this.initEventHandlers();
  }
}
