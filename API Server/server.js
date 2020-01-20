const express = require('express');
const path = require('path');
const cors = require('cors');
const uuidv4 = require('uuid/v4')
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



app.get('/testimonials', (req, res) => {
    res.json(db);
  });

app.get('/testimonials/:id', (req, res) => {
    res.json(db[req.params.id])
});

app.get('/testimonials/random', (req, res) => {
    id = uuidv4();
    res.json(db[id]);
});

app.post('/testimonials', (req, res) => {
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
    let random = getRandom(3,9);
    db[random] = {
      id: random,
      author: "Harry Potter",
      text: "You are a wizard Harry!",
    }
    res.json(db);
});

app.put('/testimonials/:id', (req, res) => {
    db[req.params.id] = {
      id: req.params.id,
      author: "Gandalf",
      text: "You shall not pass",
    }
    res.json(db);
});

app.delete('/testimonials/:id', (req, res) => {
    delete db[req.params.id]
    res.json(db)
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  ];