const notes = require("express").Router();
// const writeFile = require('fs');
const {uuidv4} = require('uuidv4');
let data = require("../db/db.json");

// const { v4: uuidv4 } = require('uuid');

const uuid = (newID) => {
    newID.id = uuidv4();
    return newID;
}

notes.get("/", (req, res) => {
  res.json(data);
  console.log("GET request recieved");
});

notes.post('/', (req,res)=> {
    data.push(uuid(req.body));
  // Log the response body to the console
  console.log(req.body);
    console.log('POST req recieved');
})

module.exports = notes;
