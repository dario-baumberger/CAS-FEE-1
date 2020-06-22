import {NotesService} from '../services/notes.js';

export class Modal {
    constructor(template) {
        this.template = template;
        this.$modal = document.querySelector ('.modal' );
        this.notesService = new NotesService();
    }

    showModal(){
        this.$modal.classList.add('modal--open');
    }

    modalClose(){
        this.$modal.classList.remove('modal--open');
        this.modalClear();
    }

    modalClear(){
        this.$modal.innerHTML = '';
    }

    async initEventHandlers() {
        window.addEventListener('click', async (event) => {
            if (event.target.matches('.js-modal--edit')) {
                const id = event.target.closest('.note').dataset.id;
                this.notesService.getNote(id).then( (data) => {
                    this.template.renderTemplate({title: 'Edit'}, 'modalcontent', '.modal');
                    this.template.renderTemplate({title: data.title, note: data.content, id: data.id, categories: data.categories, state: data.state  }, 'form', '.modal__template');
                    this.showModal();
                });
            }else  if (event.target.matches('.js-modal--filter')) {
                this.template.renderTemplate({title: 'Filter'}, 'modalcontent', '.modal');
                this.template.renderTemplate({title: 'Filter', note: 'Demo Note' }, 'filter', '.modal__template');
                this.showModal();
            }
            else  if (event.target.matches('.js-modal--add')) {
                console.log('in')
                this.template.renderTemplate({title: 'Add'}, 'modalcontent', '.modal');
                this.template.renderTemplate({title: '', note: '' }, 'form', '.modal__template');
                this.showModal();
            }
        });


        this.$modal.addEventListener('click', (event) => {
            if (event.target.matches('.modal__close')) {
                this.modalClose();
            }
        });
    }

    async init(){
        await this.initEventHandlers();
    }
}
