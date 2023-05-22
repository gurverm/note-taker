const notes = require("express").Router();
// const writeFile = require('fs');
const fs = require("fs");
const { parse } = require("path");
const { v4: uuidv4 } = require("uuid");
// const { writeFile, readFile, appendFile } = require("fs");
// let data = require("../db/db.json");

const data = fs.readFileSync("./db/db.json", { encoding: "utf8" });
// Display the file data
// console.log(data);

// parse stringified data into an object
let parsedData = JSON.parse(data);

notes.post("/", (req, res) => {
  parsedData.push({ id: uuidv4(), ...req.body });
  const updatedData = JSON.stringify(parsedData);

  //saves updated data to db.json file
  fs.writeFileSync("./db/db.json", updatedData, { encoding: "utf8" });
  res.json(`Note added successfully 🚀`);
});

notes.get("/", (req, res) => {
  res.json(parsedData);
  console.log("GET request recieved");
});

notes.delete("/:id", (req, res) => {
  console.log("DELETE request recieved");
  parsedData = parsedData.filter((note) => note.id !== req.params.id);
  const updatedData = JSON.stringify(parsedData);
  fs.writeFileSync("./db/db.json", updatedData, { encoding: "utf8" });
  res.json(updatedData);
});

module.exports = notes;
