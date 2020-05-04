module.exports = function(app){
    const Request = require('request');
    app.get('/list', function(req, res){
        Request.get('http://localhost:3000/api/notes', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let notes  = JSON.parse(body).notes;
                console.log(notes)
                let page = {lang: 'de', page: 'Home', description: 'lorem', color: 'red', copyright: 'Copyright 2019 Dario Baumberger'};
                let notifications = []
                console.log(notes.notes)
                res.render('main', {layout : 'index', page: page, notes})
            }
        })
    })

    app.get('/backlog', function (req, res) {
        let page = {lang: 'de', page: 'Backlog', description: 'lorem', color: 'red', copyright: 'Copyright 2019 Dario Baumberger'};
        let notes = [{id: 1, title: 'Title 1', content: 'lorem ipsum dolor', created: '12.12.2019', due: '12.12.2020', priority: 5, age: 35}, {id: 2, title: 'Title 2', content: 'hahah', created: '12.12.2019', due: '12.12.2020', priority: 5, age: 10}]
        let notifications = []
        res.render('main', {layout : 'backlog', page: page, notes: notes, notifications : notifications})
    })


}