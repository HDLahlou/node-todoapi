const {MongoClient, ObjectID} = require('mongodb');
//V3, arguments are now (err,client)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to Mongodb server');
  //find can take arguments, is a query search {completed:false}
  // db.collection('Todos').find({
  //   _id: new ObjectID('5baa8f022ca25e00cda47f23')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) =>{
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos count ${count}`);
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) =>{
    console.log('Unable to fetch todos', err);
  });

  db.close();
});
