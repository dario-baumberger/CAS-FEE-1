document.addEventListener('click', function (event) {




    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.click-me')) return;

    // Don't follow the link
    event.preventDefault();

    // Log the clicked element in the console
    console.log(event.target);

}, false);

console.log('asd')

function showModal(modalContent) {
    let modalEl = document.getElementsByClassName('modal')[0];
    let modalContentEl = document.getElementsByClassName('modal-content-' + modalContent)[0];
    console.log(modalEl)
    modalEl.classList.add('is-open');
    modalContentEl.classList.add('is-open');
}

function closeNotification() {
    let El = event.currentTarget.parentNode;
    El.classList.add('is-removed');
    setTimeout(function(){ El.remove(); }, 300);

}

function closeModal() {
    let content = event.currentTarget.parentNode;
    let parent = content.parentNode;
    content.classList.remove('is-open');
    parent.classList.remove('is-open');


}

const socket = io.connect('http://localhost:3000');
socket.on('notification', (data) => {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});