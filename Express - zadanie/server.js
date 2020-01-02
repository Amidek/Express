const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
    res.show = (name) => {
      res.sendFile(path.join(__dirname + `/views/${name}`));
    };
    next();
});

app.use('/user', (req, res, next) => {
    res.show('/forbidden.html');
    next();
});

app.use(express.static(path.join(__dirname + '/views')));

app.get('/', (req, res) => {
    res.show('home.html');
});

app.get('/home', (req, res) => {
    res.show('home.html');
});

app.get('/about', (req, res) => {
    res.show('about.html');
});

app.get('/404'), (req, res) => {
    res.sendFile('404.jpg');
};

app.use((req, res) => {
    res.show('404.html');
});

app.listen(8888, () => {
    console.log('Server is running on port: 8888');
});