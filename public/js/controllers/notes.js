import {NotesService} from '../services/notes.js';
import {Template} from '../controllers/template.js';


export class Notes {
    constructor(socket) {
        this.template = new Template();
        this.$notes = document.querySelector ('.notes' );
        this.socket = socket;
        this.notesService = new NotesService();
    }

    noteDone(){
        let content = event.target.parentNode;
        let note = content.parentNode;
        let listEl = note.parentNode;
        let id = listEl.dataset.id
        listEl.classList.add('note--removed');
        this.notesService.updateState(id, 2).then( (data) => {
            //data.forEach(note => this.template.renderTemplate(note, 'note', '.notes__list'));
            console.log(data)
        });
      //  setTimeout(function(){ listEl.remove(); }, 300);
      //  this.socket.emit('noteDone', { id: id });
    }

    initEventHandlers() {
        this.$notes.addEventListener('click', (event) => {
            if (event.target.matches('.js-note--done')) {
                this.noteDone();
            }
        });
    }

     init(){
        this.initEventHandlers();

        this.notesService.getNotes().then( (data) => {
            console.log(data)
            data.forEach(note => this.template.renderTemplate(note, 'note', '.notes__list'));
        });
    }
}
