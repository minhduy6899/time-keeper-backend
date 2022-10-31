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

module.exports = { connect };
