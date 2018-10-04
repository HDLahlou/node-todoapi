const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user');

// Todo.remove(), making it ({}) removes all entries
//Todo.remove({}).then((result) => {
// console.log(result);
//});

//Todo.findOneAndRemove() deletes certain object and returns it to user/ as argument
//Todo.findByIdAndRemove also returns the deleted as argument

Todo.findOneAndRemove({_id: ''}).then((todo) =>{

});
Todo.findByIdAndRemove('5bb5172b26e9070108738768').then((todo) =>{
  console.log(todo);
});
