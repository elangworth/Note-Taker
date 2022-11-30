const { application } = require('express');
const express = require('express');
const notesRouter = express.Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

//get route for retreiving all the notes
notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    
});

notesRouter.post('/', (req, res) => {
    //destructuring assignment for the items in req.body
    const { title, text } = req.body;
    //if all the required properties are present
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);
    } else {
        res.json('error in posting note');
    }
});

notesRouter.delete('/api/notes/:id', (req, res) => {
    //destructiing assignemnt for items in req.body
    const { text, title, id} = req.body;
    //if all the required properties are present
    if ( title && text && id) {
        const deleteNote = {
            title,
            text,
            id: uuid(),
        };
        readAndAppend(deleteNote, './db/db.json');
        const response = {
            status: 'success',
            body: deleteNote,
        };
        res.json(response);
    } else {
        res.json('error in deleting note');
    } 
});

module.exports = notesRouter;