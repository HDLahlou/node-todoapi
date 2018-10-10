var mongoose = require('mongoose');
//schema
//mongoose validators
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true //gets rid of white space at beggining and end
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.ObjectId,
    required: true
  }
});

module.exports = { Todo };
