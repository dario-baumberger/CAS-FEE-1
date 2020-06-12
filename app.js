'use strict'

const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const hbsHelpers = require('handlebars-helpers');
const hbsMultiHelpers = hbsHelpers();
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser')();


require('./routes/routes.index.js')(app);
let apiRoutes = require('./routes/routes.api.js')

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
/*
hbsMultiHelpers.registerHelper('for', function(from, to, incr, block) {
    var accum = '';
    for(var i = from; i < to; i += incr)
        accum += block.fn(i);
    return accum;
});*/

app.engine('hbs', hbs({
    helpers: hbsMultiHelpers,
    extname: 'hbs',
    defaultLayout:'main.hbs',
    layoutsDir: path.join(__dirname, '/views/layouts'),
}));
/*
hbsHelpers.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});*/



app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


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


    socket.on('my other event', (data) => {
        console.log(data);
    });
    socket.on('noteDone', (data => {
        socket.emit('notification', { title: 'title', text: 'Updated: Done' });
    }))
});

app.use(function (req, res, next) {
    let page = {lang: 'de', page: 'Error 404'};
    res.status(404).render('main', {layout : 'error-404', page: page})
})
/*
app.use(function (err, req, res, next) {
    console.error(err.stack)
    let page = {lang: 'de', page: 'Error 500'};
    res.status(500).render('error', {page: page})
})
*/
