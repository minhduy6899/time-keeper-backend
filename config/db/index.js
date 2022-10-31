const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(`mongodb+srv://minhduy6899:${process.env.DB_PASSWORD}@shop-24h.re1mfjg.mongodb.net/?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connect successfully!!!!');
  } catch (error) {
    console.log('connect failed!!!!');

  }
}

module.exports = { connect };
