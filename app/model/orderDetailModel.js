const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetail = new Schema({
  // _id: { type: ObjectId, unique: true },
  quantity: { type: Number, default: 0 },
  product: [
    {
      type: mongoose.Types.ObjectId,
      ref: "product",
    }
  ],
  timeCreated: { type: Date, default: Date.now() },
  timeUpdated: { type: Date, default: Date.now() },
}, {
  timestamps: true
});

module.exports = mongoose.model('OrderDetail', OrderDetail);
