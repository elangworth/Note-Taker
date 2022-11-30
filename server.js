const exp = require('constants');
const express = require('express');
const path = require('path');
const notesRouter = require('./routes/notes');
const { clog } = require('./middleware/clog');

const app = express();
app.set('view engine', 'ejs');
const PORT = Number(process.env.PORT) || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);//to use on just one part i could do app.get('/', logger (req, res))
app.use('/api/notes', notesRouter);

// Import custom middleware, "cLog"
app.use(clog);

//get route for homepage
app.get('/', (req, res) => {
    res.render('index')
});
// get route for notes page
app.get('/notes', (req, res) => {
    res.render('notes')
});

app.listen(PORT)

console.log('hello') 

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}