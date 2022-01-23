const { response } = require('express');
const Post = require('../models/Post');
exports.getAllPost = async (req, res) => {
  const posts = await Post.find({}).sort('-dateCreated');
  res.render('index', { posts });
};

exports.getPost = async (req, res) => {
  let id = req.params.id;
  let post = await Post.findById(id);
  res.render('post', { post });
};

exports.editPostFrm = async (req, res) => {
  let id = req.params.id;
  let post = await Post.findById(id);
  res.render('postEdit', { post });
};

exports.editPostSave = async (req, res) => {
  let id = req.params.id;
  const post = await Post.findById(id);
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();
  res.redirect('/');
};

exports.deletePost = async (req, res) => {
  let id = req.params.id;
  await Post.findByIdAndRemove(id);
  res.redirect('/');
};

exports.addPostFrm = (req, res) => {
  res.render('postAdd');
};

exports.savePost = async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
};
