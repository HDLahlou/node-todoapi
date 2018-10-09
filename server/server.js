require('./config/config')
//******REQUIRES*******************************************

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate.js')

const app = express();
const port = process.env.PORT;

//***********CODE BODY****************************************
app.use(bodyParser.json());

//*************TODOS*******************************************

//Creates a todo doc
app.post('/todos', (req , res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) =>{
  res.send(doc);
}, (e) =>{
  res.status(400).send(e);
});
});

//GET all of users docs
app.get('/todos', (req, res) => {
  Todo.find().then((todos) =>{
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET specific doc
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) =>{
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

//DELETES a specified entry
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
});

//PATCH update a specified doc
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


//************USERS********************************************

//Create Account
app.post('/users', (req,res) => {
  var body = _.pick(req.body, ['name','email', 'password']);
  var user= new User(body);

  User.findByToken
  user.generateAuthToken

  user.save().then(() =>{
    return user.generateAuthToken();
}).then((token) =>{
  res.header('x-auth', token).send(user);
}).catch((e) => {
    res.status(400).send(e);
  })

});

//GETS user based on header x-auth token, utilizes authenticate
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});


// POST Login function to recieve x-auth
app.post('/users/login', (req, res) =>{
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) =>{
      res.header('x-auth', token).send(user);
    });
  }).catch((e) =>{
    res.status(400).send();
  })
})



//*******SERVER PORT INIT******************************************
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};



//************NOTES********************************************
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
