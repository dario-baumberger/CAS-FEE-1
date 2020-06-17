import {Modal} from './controllers/modal.js';
import {Notes} from './controllers/notes.js';
import {NotesService} from './services/notes.js';
import {Template} from './controllers/template.js';
import {SocketIo} from './controllers/socket.io.js';
import {Notifications} from './controllers/notifications.js';

class Bootstrapper {
    static start() {
        const socket = io.connect('http://localhost:3000');
        const template = new Template();
        const socketIo = new SocketIo();
        new Modal(template).init();
        new Notifications(template, socket).init();
        new Notes(template, socket).init();
        new NotesService();
    }
}

// wait until scripts have been loaded
document.addEventListener('DOMContentLoaded', Bootstrapper.start);
