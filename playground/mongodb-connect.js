const MongoClient = require('mongodb').MongoClient;
//V3, arguments are now (err,client)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to Mongodb server');
//V3 const db = client.db('TodoAPP')

//Takes two arguments, 1st is object 2nd call back function
/*db.collection('Todos').insertOne({
  text: 'Something to do',
  completed: false
}, (err, result)=> {
  if(err){
    return console.log('Unable to insert todo', err);
  }
  console.log(JSON.stringify(result.ops, undefined, 2))
});*/
//V3 Client.close

//Insert new doc into Users (name, age, location)
db.collection('Users').insertOne({
  name: 'User1',
  age: 20,
  location: 'Alexandria, Va'
}, (err, result) => {
  if(err) return console.log("Unable to insert User", err);
  console.log(JSON.stringify(result.ops, undefined, 2))
});
  db.close();
});
