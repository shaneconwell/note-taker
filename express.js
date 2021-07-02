const express = require("express");
const path = require("path");
const fs = require("fs");
// npm for generating a unique ID
const { v4: uuidv4 } = require("uuid");
const dbRead = fs.readFileSync("db.json");
const dbParse = JSON.parse(dbRead);
const app = express();
const id = uuidv4();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// GET routes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
app.get("/api/notes", (req, res) => res.json(dbParse));

// Ran out of time trying to get delete to work
// app.get('/api/notes/:id', (req, res) => {
//     for (let i = 0; i < dbParse.length; i++) {
//         const element = dbParse[i];
//         res.json(element.id);
//     }

// FETCH routes

app.post("/api/notes", (req, res) => {
  const note = req.body;
  addNote(note);
  res.json(note);
});
const addNote = (note) => {
  note.id = id;
  dbParse.push(note);
  let notes = JSON.stringify(dbParse, null, 2);
  fs.writeFile("db.json", notes, (err) =>
    err ? console.error(err) : console.log("Commit logged!")
  );
};

app.listen(PORT, () =>
  console.log(`App listening on PORT http://localhost:${PORT}`)
);
