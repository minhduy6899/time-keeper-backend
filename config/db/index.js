const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connect successfully!!!!');
  } catch (error) {
    console.log('connect failed!!!!');

  }
}

// mongodb+srv://minhduy:minhduy1@time-keeper-shop.e82m1hm.mongodb.net/?retryWrites=true&w=majority


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.DB_URL;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("products")
//   // perform actions on the collection object
//   // collection.find({}).toArray().then((docs) => {
//   //   console.log(EJSON.stringify(docs));
//   // });
//   console.log(collection)
//   client.close();
// });

module.exports = { connect };
