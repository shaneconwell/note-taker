const express = require('express');
const path = require('path');
const notes = require('./db.json')
const fs = require('fs');

// npm for generating a unique ID
const { v4: uuidv4 } = require('uuid');

const app = express();
const id = uuidv4();
const PORT = process.env.PORT || 8080;


const dbRead = fs.readFileSync('db.json')
let dbParse = JSON.parse(dbRead)


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// GET routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => res.json(notes));

// app.get('/api/notes/:id', (req, res) => {
//     for (let i = 0; i < notes.length; i++) {
//     res.json(notes[i].id)
//     }
// });

// FETCH routes

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = id;
    dbParse.push(newNote);
    // console.log(newNote);
    let note = JSON.stringify(dbParse,null,2)
    // console.log(note);
    fs.writeFile('db.json', note, (err) =>
    err ? console.error(err) : console.log('Commit logged!')
    )
    

});


app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));

