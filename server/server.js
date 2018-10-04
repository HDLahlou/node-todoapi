const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//Creates post/ document
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

//Gets all data
app.get('/todos', (req, res) => {
  Todo.find().then((todos) =>{
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/1234324 be able to fetch that id
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  //validate id
    //404- send back empty send
  Todo.findById(id).then((todo) =>{
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
  //query database find by id
  //success, if todo send data if not then send 404
  // error,
  //400 - send nothing
});

//Deletes entry
app.delete('/todos/:id', (req, res) =>
{
  //get the id
  var id = req.params.id;
  //validate id send 404
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  //remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
    //success
      //if no doc send 404
      //else send doc and 200
    //error
    //400 with empty body

});
//http patch

app.patch('/todos/:id', (req,res) =>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed ){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) =>{
    res,status(400).send();
  })
});




//Intializes the entire server
app.listen(port, () => {
  console.log(`Started on port ${port}`);
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
