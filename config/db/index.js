const mongoose = require('mongoose');

// async function connect() {
//   try {
//     await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@time-keeper-shop.e82m1hm.mongodb.net/?retryWrites=true&w=majority`, {
//       useCreateIndex: true,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false
//     });
//     console.log('connect successfully!!!!');
//   } catch (error) {
//     console.log('connect failed!!!!');

//   }
// }



const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.htal2au.mongodb.net/?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = { connect };
