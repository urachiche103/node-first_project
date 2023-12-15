const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: false,
  },
});

const Books = mongoose.model('books', bookSchema);
module.exports = Books;