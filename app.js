const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bp = require('body-parser');

const Post = require('./models/Post');

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const port = 3000;

//DB CONNECT
mongoose.connect('mongodb://localhost/cleanblog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', { posts });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/posts', async (req, res) => {
  console.log(req.body);

  await Post.create(req.body);

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
