const {MongoClient, ObjectID} = require('mongodb');
//V3, arguments are now (err,client)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to Mongodb server');

  //Documentation for findOneAndUpdate (filter, update, options, callback), returns a promise if no callback
  //mongodb update operators https://docs.mongodb.com/manual/reference/operator/update/#id1
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5bad1d06ce272fce9fccb6b0')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) =>{
  //   console.log(result);
  // });


  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5baa9c1aaf670b00fdf495ca')
  },{
    $set: {
      name: 'Hakim'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) =>{
    console.log(result);
  });
//  db.close();
});
