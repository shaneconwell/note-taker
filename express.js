const express = require('express');
const path = require('path');
const notes = require('./db/db.json')



const fs = require('fs');

// npm for generating a unique ID
const { v4: uuidv4 } = require('uuid');

const app = express();
const id = uuidv4();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// GET routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => res.json(notes));

// FETCH routes
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.routeName
    notes.push(newNote);
    res.json(newNote);
});

app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));