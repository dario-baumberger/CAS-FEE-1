import { ModalController } from "./controllers/modal.js";
import { NotesController } from "./controllers/notes.js";
import { NotesService } from "./services/notes.js";
import { SocketIo } from "./controllers/socket.io.js";
import { Notifications } from "./controllers/notifications.js";
import { ThemeController } from "./controllers/theme.js";

class Bootstrapper {
  static start() {
    const socket = io.connect("http://localhost:3000");
    const socketIo = new SocketIo();
    new ModalController().init();
    new Notifications().init();
    new NotesController(socket).init();
    new ThemeController().init();
    new NotesService();
  }
}

document.addEventListener("DOMContentLoaded", Bootstrapper.start);
