export class Notifications {
    constructor(template, socket) {
        this.template = template;
        this.socket = socket;
        this.$notifications = document.querySelector ('.notifications' );
    }

    closeNotification(){

        let El = event.target.parentNode;

        El.classList.add('notification--removed');

        setTimeout(function(){ El.remove(); }, 300);
    }

    initEventHandlers() {


        this.$notifications.addEventListener('click', (event) => {
            if (event.target.matches('.notification__close')) {
                this.closeNotification();
            }
        });

        this.socket.on('notification', (data) => {
            console.log('1234')
            this.template.renderTemplate(data, 'notification', '.notifications__list');
        });
    }

    init(){
        this.initEventHandlers();
    }
}
