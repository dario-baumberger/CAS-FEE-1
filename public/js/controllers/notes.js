import {NotesService} from '../services/notes.js';
import {Template} from '../controllers/template.js';
import {Modal} from "../controllers/modal.js";



export class Notes {
    constructor(socket) {
        this.template = new Template();
        this.modal = new Modal();
        this.$notes = document.querySelector ('.notes' );
        this.socket = socket;
        this.notesService = new NotesService();
    }

    clearNotes(){
        document.querySelectorAll ('.note' ).forEach(n => n.remove());

    }

    noteDelete(){
        event.preventDefault();
        console.log('delete 2')
        const id = document.getElementById('id').value;
      //  listEl.classList.add('note--removed');
        this.notesService.deleteNote(id).then( (data) => {
            //data.forEach(note => this.template.renderTemplate(note, 'note', '.notes__list'));
            if(data.status === 'success'){
                console.log('if')
                this.notesService.getNotes().then( (data) => {
                    this.clearNotes();
                    data.forEach(note => this.template.renderTemplate(note, 'note', '.notes__list'));
                    this.modal.modalClose();
                });
            }else{
                console.log('else')
            }
            console.log(data)
        });
      //  setTimeout(function(){ listEl.remove(); }, 300);
      //  this.socket.emit('noteState', { id: id });
    }

    noteState(state){
        let content = event.target.parentNode;
        let note = content.parentNode;
        let listEl = note.parentNode;
        let id = listEl.dataset.id;
        listEl.classList.add('note--removed');
        this.notesService.updateState(id, state).then( (data) => {
            this.notesService.getNotes().then( (data) => {
                this.clearNotes();
                data.forEach(note => this.template.renderTemplate(note, 'note', '.notes__list'));
                this.modal.modalClose();
            });
        });
    }

    noteUpdate(){
        const data = this.noteGetData();

        this.notesService.updateNote(data).then( (data) => {
            this.notesService.getNotes().then( (data) => {
                this.clearNotes();
                data.forEach(note => this.template.renderTemplate(note, 'note', '.notes__list'));
                this.modal.modalClose();
            });
        });
    }

    noteGetData(){
        const title = document.getElementById('title').value;
        const note = document.getElementById('note').value;
        const state = document.getElementById('state').value;
        const category = document.getElementById('category').value;
        const due = document.getElementById('due').value;
        const importance = document.getElementById('importance').value;
        const id = document.getElementById('id').value;

        console.log(id)

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

    noteAdd(){

        const data = this.noteGetData();

        this.notesService.addNote(data).then( (data) => {
            this.notesService.getNotes().then( (data) => {
                this.clearNotes();
                data.forEach(note => this.template.renderTemplate(note, 'note', '.notes__list'));
                this.modal.modalClose();
                console.log('added')
            });
        });
        event.preventDefault();


    }

    initEventHandlers() {
        this.$notes.addEventListener('click', (event) => {
            if (event.target.matches('.js-note--done')) {
                this.noteState(2);
            }
            if (event.target.matches('.js-note--progress')) {
                this.noteState(1);
            }
        });

        window.addEventListener('submit', (event) => {
            if (event.target.matches('#form-data')) {
                this.noteAdd();
            }
        });

        window.addEventListener('click', (event) => {
            if(event.target.matches('.js-note--delete')){
                this.noteDelete();
            }

            if(event.target.matches('.js-note--save')){
                event.preventDefault()
                this.noteUpdate();
            }
        })

    }

     init(){
        this.initEventHandlers();

        this.notesService.getNotes().then( (data) => {
            data.forEach(note => this.template.renderTemplate(note, 'note', '.notes__list'));
        });
    }
}
