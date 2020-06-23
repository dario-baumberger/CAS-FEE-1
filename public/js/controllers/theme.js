export class Theme {
  constructor() {
    this.$html = document.querySelector("html");
    this.$toggles = document.querySelectorAll(".js-theme--toggle");
  }

  toggleTheme() {
    console.log(this.$toggles);

    [].forEach.call(this.$toggles, function (toggle) {
      toggle.parentNode.classList.toggle("hidden");
    });
    this.$html.classList.toggle("theme-dark");
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
