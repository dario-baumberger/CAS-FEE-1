export class Notes {
    constructor(template, socket) {
        this.template = template;
        this.$notes = document.querySelector ('.notes' );
        this.socket = socket;
    }

    noteDone(){
        let content = event.target.parentNode;
        let note = content.parentNode;
        let listEl = note.parentNode;
        listEl.classList.add('note--removed');
        setTimeout(function(){ listEl.remove(); }, 300);

        this.socket.emit('noteDone', { id: 'asd' });
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
    }
}
