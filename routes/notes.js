const notes = require('express').Router();
const writeFile = require('fs');

const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

let data = require('../db/db.json');
const { error } = require('console');

const updateDatabase = (data) => {
    writeFile('./db/db.json', JSON.stringify(data),(error) =>{
        if (error) console.info(error);
    });
};

notes.get('/',(req, res) => {
    res.json(data);
});

notes.post('/',(req, res) => {
    data.push(uuid(req.body));
    updateDatabase(data);
})

notes.delete('/:id', (req,res)=>{
    data = data.filter((note) => note.id !== req.params.id);
    updateDatabase(data);
    res.json(data);
})

module.exports = notes;