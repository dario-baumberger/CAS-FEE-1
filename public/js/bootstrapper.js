import {Modal} from './modules/modal.js';
import {Notes} from './modules/notes.js';
import {Template} from './modules/template.js';
import {SocketIo} from './modules/socket.io.js';
import {Notifications} from './modules/notifications.js';

class Bootstrapper {
    static start() {
        const socket = io.connect('http://localhost:3000');
        const template = new Template();
        const socketIo = new SocketIo();
        new Modal(template).init();
        new Notifications(template, socket).init();
        new Notes(template, socket).init();
    }
}

// wait until scripts have been loaded
document.addEventListener('DOMContentLoaded', Bootstrapper.start);
