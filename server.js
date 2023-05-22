const express = require('express');
const path = require('path');
const notes = require('./routes/notes.js')

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get('/', (req,res)=>
    res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res)=>
res.sendFile(path.join(__dirname, 'public/notes.html')));

app.use('/api/notes',notes);

app.listen(PORT, ()=>
    console.log(`app is listening at http://localhost:${PORT}`));