const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();


app.use(bodyParser.json());

app.post('/todos', (req , res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) =>{
  res.send(doc);
}, (e) =>{
  //http statuses for how requests went httpstatuses.com
  res.status(400).send(e);
});
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) =>{
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};

// =====Example of creating input============
// var newUser = new User({
//   name: 'Hakim',
//   email: ' atgmail '
// });
// newUser.save().then((doc) => {
//   console.log('Saved User ', doc);
// }, (e) => {
//   console.log('Unable to save ', e)
// });
