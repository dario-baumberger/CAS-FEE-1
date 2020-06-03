export class Modal {
    constructor(template) {
        this.template = template;
        this.$modal = document.querySelector ('.modal' );
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

    initEventHandlers() {
        window.addEventListener('click', (event) => {
            if (event.target.matches('.js-modal--edit')) {
                this.template.renderTemplate({title: 'title'}, 'modalcontent', '.modal');
                this.template.renderTemplate({title: 'Demo Title', note: 'Demo Note' }, 'form', '.modal__template');
                this.showModal();
            }else  if (event.target.matches('.js-modal--filter')) {
                this.template.renderTemplate({title: 'title'}, 'filter', '.modal');
                this.template.renderTemplate({title: 'Filter', note: 'Demo Note' }, 'form', '.modal__template');
                this.showModal();
            }
        });


        this.$modal.addEventListener('click', (event) => {
            if (event.target.matches('.modal__close')) {
                this.modalClose();
            }
        });
    }

    init(){
        this.initEventHandlers();
    }
}
