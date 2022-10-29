const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductType = new Schema({
  // _id: { type: ObjectId, unique: true },
  name: { type: String, unique: true, required: true },
  description: { type: String },
  timeCreated: { type: Date, default: Date.now() },
  timeUpdated: { type: Date, default: Date.now() },
}, {
  timestamps: true
});

module.exports = mongoose.model('ProductType', ProductType);
