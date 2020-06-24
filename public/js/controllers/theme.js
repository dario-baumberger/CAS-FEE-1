export class Theme {
  constructor() {
    this.$html = document.querySelector("html");
    this.$logo = document.querySelector(".logo img");
    this.$toggles = document.querySelectorAll(".js-theme--toggle");
    this.dark = false;
  }

  toggleTheme() {
    [].forEach.call(this.$toggles, function (toggle) {
      toggle.parentNode.classList.toggle("hidden");
    });
    this.$html.classList.toggle("theme-dark");
    this.dark = !this.dark;
    this.toggleLogo();
  }

  toggleLogo() {
    if (this.dark) {
      this.$logo.src = "/images/todo-logo-negative.png";
    } else {
      this.$logo.src = "/images/todo-logo.png";
    }
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
