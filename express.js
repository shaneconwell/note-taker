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


console.log(id);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
// require('./public/assets/js/index')(fs);

// GET routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => res.json(notes));

// app.get('/api/notes/:noteID', (req, res) => {
//     const chosen = req.params.character;
  
//     console.log(chosen);
  
//     for (let i = 0; i < notes.length; i++) {
//       if (chosen === notes[i].noteID) {
//         return res.json(notes[i]);
//       }
//     }
  
//     return res.json(false);
//   });

// FETCH routes
// need to figure out the ID connection
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.noteID = id;
    dbParse.push(newNote);
    // console.log(newNote);
    let note = JSON.stringify(dbParse,null,2)
    // console.log(note);
    fs.writeFile('db.json', note, (err) =>
    err ? console.error(err) : console.log('Commit logged!')
    )
    
    res.send("OK")
});


app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));

