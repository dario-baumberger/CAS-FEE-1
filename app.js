'use strict'

const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser')();


//const notesService = new NotesService();

require('./routes/routes.index.js')(app);
let apiRoutes = require('./routes/routes.api.js')

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app.set('view engine', 'html');
server.listen(port, () => console.log(`Example app listening at http://${host}:${port}`))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'
}));
app.use(express.static('public'));
app.use('/api', apiRoutes)
mongoose.connect('mongodb://localhost/', { useNewUrlParser: true});
let db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

io.on('connection', (socket) => {
    socket.emit('notification', { title: 'Welcome', text: 'Add your notes and prior them' });

    setTimeout(function(){
        socket.emit('note', {id: 7, title: 'Title 3', content: 'from server', created: '12.12.2019', due: '12.12.2020', importance: 5, age: 35});
        socket.emit('notification', { title: 'New Note', text: 'Title 3 was added to your list' });
        }, 3000);

    socket.on('noteDone', (data => {
        console.log(data.id)
        //notesService.updateState(data.id, 2)
        socket.emit('notification', { title: 'title', text: 'Updated: Done' });
    }))
});

app.use(function (req, res, next) {
    let page = {lang: 'de', page: 'Error 404'};
    res.status(404).render('main', {layout : 'error-404', page: page})
})

