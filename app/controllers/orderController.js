// Import thư viện mongoose
const mongoose = require("mongoose");
const Orders = require("../model/ordersModel");

// Create course
const createOrder = async (req, res) => {

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Orders.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    Customer: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
}

// get Single Order by Id
const getOrderById = async (req, res, next) => {
  const order = await Orders.findById(req.params.orderId)
  // .populate(
  //   "Customer",
  //   // "fullName username"
  // );

  if (!order) {
    return res.status(400).json({
      success: true,
    });;
  }

  res.status(200).json({
    success: true,
    order,
  });
};

// get my order
const getMyOrders = async (req, res, next) => {
  const orders = await Orders.find({ Customer: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
};

// get all Orders -- Admin
const getAllOrders = async (req, res, next) => {
  // B1: Get data from request
  const price = req.query.maxPrice;
  const skip = req.query.skip;
  const limit = req.query.limit;
  const maxPrice = parseInt(price)

  const condition = {}
  // B2: validate

  if (maxPrice !== 'undefined' && maxPrice !== 'NaN' && maxPrice !== NaN) {
    const regex = new RegExp(`${maxPrice}`)
    condition.itemsPrice = {
      $gte: maxPrice
    }
  }

  const orders = await Orders.find(condition).limit(limit).skip(skip);

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

// Delete Order by id
const deleteOrder = (req, res) => {
  // B1: Get data from request
  let orderId = req.params.orderId;

  // B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({
      message: "Order ID is invalid!"
    })
  }

  // B3: Call modal
  Orders.findByIdAndDelete(orderId, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Delete order successfully"
    })
  })
}

const updateOrder = (req, res) => {
  // B1: Get data from request
  let orderId = req.params.orderId;
  let bodyRequest = req.body;


  // B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({
      message: "Order ID is invalid!"
    })
  }

  // B3: Call modal
  let orderUpdate = {
    orderStatus: bodyRequest.orderStatus
  };

  Orders.findByIdAndUpdate(orderId, orderUpdate, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Update course successfully",
      order: data
    })
  })
}

// Export Order controller thành 1 module
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMyOrders
}
