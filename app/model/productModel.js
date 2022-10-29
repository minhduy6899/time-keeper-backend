const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  // _id: { type: ObjectId, unique: true },
  name: { type: String, unique: true, required: true },
  description: { type: String },
  buyPrice: { type: Number, require: true },
  imageUrl: { type: String, require: true },
  thumbnail: [
    {
      img1: { type: String },
      img2: { type: String },
      img3: { type: String }
    },
  ],
  category: { type: String, required: true },
  badge: { type: String },
  color: { type: String, require: true },
  size: { type: String },
  ratings: { type: Number, default: 0, },
  promotionPrice: { type: Number, require: true },
  amount: { type: Number, default: 0 },
  productType: [
    {
      type: mongoose.Types.ObjectId,
      ref: "productType",
      required: true,
      unique: false
    }
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    //   required: true
  },
  timeCreated: { type: Date, default: Date.now() },
  timeUpdated: { type: Date, default: Date.now() },
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', Product);
