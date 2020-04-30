const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const port = 3000;

app.set('view engine', 'ejs');

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

console.log()

app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/static', express.static('public'))
//app.use('/public', express.static(path.join(__dirname, 'public')));


let notes = [{title: 'Title 1', content: 'lorem ipsum dolor', created: '12.12.2019', due: '12.12.2020', priority: 5, age: 35}, {title: 'Title 2', content: 'hahah', created: '12.12.2019', due: '12.12.2020', priority: 5, age: 10}]
let notifications = [{title: 'Title 1', content: 'loremipsum'}, {title: 'Title 2', content: 'sdfsdf'}, {title: 'Title 3', content: 'sdf pdsf e'}]
app.get('/', (req, res) => res.render('pages/index', {notes: notes, notifications : notifications}))

app.get('/random', function (req, res) {
    res.render('pages/index');
})

io.on('connection', (socket) => {
    socket.emit('notification', { title: 'Welcome', content: 'Add your notes and prior them' });
    socket.on('my other event', (data) => {
        console.log(data);
    });
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

