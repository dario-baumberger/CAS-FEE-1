export class SocketIo {
    constructor(socket, template) {

        this.socket = socket;
        this.template = template;
    }


    initEventHandlers() {
        this.socket.on('notification', (data) => {

            this.template.renderTemplate(data, 'notification', '.notifications__list');
        });

        this.socket.on('note', (data) => {
            this.template.renderTemplate(data, 'note', '.notes__list');
        });
    }

    init(){
        this.initEventHandlers();
    }
}
