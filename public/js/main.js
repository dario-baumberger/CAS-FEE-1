'use strict'

function noteAdd(id) {
    let content = event.currentTarget.parentNode;
    let note = content.parentNode;
    let listEl = note.parentNode;
    listEl.classList.add('note--removed');
    setTimeout(function(){ listEl.remove(); }, 300);
    socket.emit('noteDone', { id: id });
}


let renderTemplate = function (data, id, target, place = 'beforeend') {


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
    let order = event.target.value
    let list = document.querySelectorAll('.notes .note');


    Array.from(list)
        .sort(({dataset: {importance: a}}, {dataset: {importance: b}}) => a.localeCompare(b))
        .forEach((item) => item.parentNode.appendChild(item));


   /* itemsArr.sort(function(a, b) {
        return a.innerHTML == b.innerHTML
              ? 0
            : (a.innerHTML > b.innerHTML ? 1 : -1);
    });

    for (var i = 0; i < itemsArr.length; ++i) {
        list.appendChild(itemsArr[i]);
    }*/
}