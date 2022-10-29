const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
  // _id: { type: ObjectId, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  // email: { type: String, required: true, unique: true },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  country: { type: String, default: "" },
  orders: [
    {
      type: mongoose.Types.ObjectId,
      ref: "orders",
    }
  ],
  timeCreated: { type: Date, default: Date.now() },
  timeUpdated: { type: Date, default: Date.now() },
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', Customer);
