"use strict";

import { ModalController } from "./controllers/modal.js";
import { NotesController } from "./controllers/notes.js";
import { NotesService } from "./services/notes.js";
import { ThemeController } from "./controllers/theme.js";

class Bootstrapper {
  static start() {
    new ModalController().init();
    new NotesController().init();
    new ThemeController().init();
    new NotesService();
  }
}

document.addEventListener("DOMContentLoaded", Bootstrapper.start);
