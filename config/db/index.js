const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(`mongodb+srv://minhduy:${process.env.DB_PASSWORD}@time-keeper-shop.e82m1hm.mongodb.net/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connect successfully!!!!');
  } catch (error) {
    console.log('connect failed!!!!');

  }
}

module.exports = { connect };
