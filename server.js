const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer  = require('multer');
var upload = multer({ dest: 'uploads/' })

const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/views/layout')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact/send-message', upload.none(), (req, res) => {
  const { author, sender, title, image, message} = req.body;

  console.log(req.body);

  if(author && sender && title && message && image) {
    res.render('contact', { isSent: true, image: req.params.image });
  }
  else {
    res.render('contact', { isError: true });
  }
});

app.get('/info', (req, res) => {
    res.render('info');
});

app.get('/history', (req, res) => {
    res.render('history', { layout: 'dark' });
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name } );
});


app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});