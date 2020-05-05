document.addEventListener("DOMContentLoaded", function() {


});


document.addEventListener('click', function (event) {




    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches('.click-me')) return;

    // Don't follow the link
    event.preventDefault();

    // Log the clicked element in the console
    console.log(event.target);

}, false);

console.log('asd')

function modalShow(title, content) {
    renderTemplate({title: title}, 'modalcontent', '.modal');
    renderTemplate({title: 'Demo Title', note: 'Demo Note' }, content[0], '.modal-content-template');
    let modalEl = document.getElementsByClassName('modal')[0];
    console.log(modalEl)
    modalEl.classList.add('is-open');
}

function notificationClose() {
    let El = event.currentTarget.parentNode;
    El.classList.add('is-removed');
    setTimeout(function(){ El.remove(); }, 300);

}

function modalClose() {
    let content = event.currentTarget.parentNode;
    let parent = content.parentNode;
    parent.innerHTML = '';
    parent.classList.remove('is-open');
}

function noteDone(id) {
    let content = event.currentTarget.parentNode;
    let note = content.parentNode;
    let listEl = note.parentNode;
    listEl.classList.add('is-removed');
    setTimeout(function(){ listEl.remove(); }, 300);
    socket.emit('noteDone', { id: id });
}

function noteAdd(id) {
    let content = event.currentTarget.parentNode;
    let note = content.parentNode;
    let listEl = note.parentNode;
    listEl.classList.add('is-removed');
    setTimeout(function(){ listEl.remove(); }, 300);
    socket.emit('noteDone', { id: id });
}


const socket = io.connect('http://localhost:3000');
socket.on('notification', (data) => {
    renderTemplate(data, 'notification', '.notifications-list');
});

socket.on('note', (data) => {
    renderTemplate(data, 'note', '.notes-list');
});

let renderTemplate = function (data, id, target, place = 'beforeend') {
    console.log(id, data, target)
    let template = document.getElementById(id).innerHTML;
    let theTemplate = Handlebars.compile(template);
    let theCompiledHtml = theTemplate(data);
    let elem = document.querySelector ( target )
    elem.insertAdjacentHTML(place, theCompiledHtml);

}

function apiCall() {
    return fetch('http://localhost:3000/api/notes').then(function (response) {
        // The API call was successful!
        return response.json();
    }).then(function (data) {
        // This is the JSON from our response
        return data;
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}

function listSort() {
   console.log(apiCall)
}