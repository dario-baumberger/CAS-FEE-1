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

const port = process.env.PORT || 3000;

/*hbsHelpers.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

hbsHelpers.registerHelper('for', function(from, to, incr, block) {
    var accum = '';
    for(var i = from; i < to; i += incr)
        accum += block.fn(i);
    return accum;
});*/

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    helpers: hbsMultiHelpers,
    extname: 'hbs',
    defaultLayout:'main.hbs',
    layoutsDir: path.join(__dirname, '/views/layouts'),
}));
app.set('views', path.join(__dirname, 'views'));

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/static', express.static('public'))
//app.use('/public', express.static(path.join(__dirname, 'public')));
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
       // socket.emit('note', {id: 7, title: 'Title 3', content: 'from server', created: '12.12.2019', due: '12.12.2020', priority: 5, age: 35});
        socket.emit('notification', { title: 'New Note', text: 'Title 3 was added to your list' });
        }, 3000);


    socket.on('my other event', (data) => {
        console.log(data);
    });
    socket.on('noteDone', (data => {
        socket.emit('notification', { title: 'title', text: 'Updated: Done' });
    }))
});

/*app.use(function (req, res, next) {
    let page = {lang: 'de', page: 'Error 404'};
    res.status(404).render('error', {page: page})
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    let page = {lang: 'de', page: 'Error 500'};
    res.status(500).render('error', {page: page})
})
*/
