const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user');



//var id = '';


// if(!ObjectID.isValid(id){
//   console.log('ID not Valid');
// }
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });
//
// Todo.findById(id).then((todo) => {
// if(!todo){
//   return console.log('ID not found');
// }
//   console.log('Todo', todo);
// }).catch((e) => console.log(e));

User.findById('').then(() => {
  if(!user) {
    return console.log('Unable to find user');
  }

  console.log(JSON.stringify(user,undefined, 2));
}, (e) =>{
  console.log(e);
})
