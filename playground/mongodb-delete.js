const {MongoClient, ObjectID} = require('mongodb');
//V3, arguments are now (err,client)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to Mongodb server');
  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat'}).then((result) =>{
  //   console.log(result);
  // });
  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) =>{
  //   console.log(result);
  // });
  //findOneAndDelete
  db.collection('Todos').findOneandDelete({completed: false}).then((result) => {
    console.log(result);
  });
//  db.close();
});
