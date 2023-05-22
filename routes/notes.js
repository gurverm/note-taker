const notes = require("express").Router();
// const writeFile = require('fs');
const { v4: uuidv4 } = require("uuid");
const { writeFile, readFile, appendFile } = require("fs");
let data = require("../db/db.json");

const appendToFile = (appendToFile) => {
  appendFile("./db/db.json", JSON.stringify(appendToFile), (err) => {
    if (err) console.log(err);
  });
};

notes.get("/", (req, res) => {
  res.json(data);
  console.log("GET request recieved");
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newNote = [
      {
        title,
        text,
        id: uuidv4(),
      },
    ];
    appendToFile(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding tip");
  }

  // Log the response body to the console
  console.log(req.body);
  console.log("POST req recieved");
});

module.exports = notes;
