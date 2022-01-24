const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const ejs = require('ejs');
const bp = require('body-parser');

const Post = require('./models/Post');
const postController = require('./controllers/postController');
const commonController = require('./controllers/commonController');
const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.set('view engine', 'ejs');

const port = process.env.PORT || 5000;

//DB CONNECT
mongoose.connect('mongodb+srv://turqay:<password>@cluster0.2oaay.mongodb.net/CleanBlogDb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', postController.getAllPost);
app.get('/post/add', postController.addPostFrm);
app.post('/post/save', postController.savePost);
app.get('/post/:id', postController.getPost);
app.get('/post/:id/edit', postController.editPostFrm);

app.put('/post/:id/update', postController.editPostSave);

app.delete('/post/:id/delete', postController.deletePost);

app.get('/about', commonController.aboutPage);

app.listen(port);
