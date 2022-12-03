const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },

    state: {
      type: String,
      required: false,
    },

    country: {
      type: String,
      required: false,
    },
    pinCode: {
      type: Number,
      required: false,
    },
    phoneNo: {
      type: Number,
      required: false,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: false,
      },
      price: {
        type: Number,
        required: false,
      },
      quantity: {
        type: Number,
        required: false,
      },
      image: {
        type: String,
        required: false,
      },
      color: {
        type: String,
        required: false,
      },
      size: {
        type: String,
        required: false,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: false,
      },
    },
  ],
  Customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: false,
  },
  paymentInfo: {
    id: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    required: false,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: false,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: false,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Orders", orderSchema);
