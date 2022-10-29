// Import thư viện mongoose
const mongoose = require("mongoose");

const orderModel = require('../model/orderModel');

// Create course
const createOrder = (req, res) => {
  // B1: Get data from request
  let bodyRequest = req.body;

  // B2: Validate data
  if (!bodyRequest.note) {
    return res.status(400).json({
      message: "email is required!"
    })
  }

  if (!bodyRequest.cost) {
    return res.status(400).json({
      message: "address is required!"
    })
  }
  const date = new Date(bodyRequest.shippedDate)

  // B3: Call modal
  let newOrderData = {
    _id: mongoose.Types.ObjectId(),
    shippedDate: date,
    note: bodyRequest.note,
    cost: bodyRequest.cost,
  }
  orderModel.create(newOrderData, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message,
        error: "something wrong when create order"
      })
    }

    return res.status(201).json({
      message: "Create successfully",
      newOrder: data
    })
  })
}

// Get all course
const getAllOrders = (req, res) => {
  // B1: Get data from request
  // B2: Validate data
  // B3: Call modal
  orderModel.find((error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Get all courses successfully",
      Order: data
    })
  })
}

// Get course by id
const getOrderById = (req, res) => {
  // B1: Get data from request
  let orderId = req.params.orderId;

  // B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({
      message: "Course ID is invalid!"
    })
  }

  // B3: Call modal
  orderModel.findById(orderId, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(201).json({
      message: "Get Order successfully",
      order: data
    })
  })
}

// Update course by id
const updateOrder = (req, res) => {
  // B1: Get data from request
  let orderId = req.params.orderId;
  let bodyRequest = req.body;

  // B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({
      message: "ProductType ID is invalid!"
    })
  }

  // Bóc tách trường hợp undefied
  if (!bodyRequest.cost) {
    return res.status(400).json({
      message: "cost is required!"
    })
  }

  // B3: Call modal
  let orderUpdate = {
    note: bodyRequest.note,
    cost: bodyRequest.cost,
  };

  orderModel.findByIdAndUpdate(orderId, orderUpdate, (error, data) => {
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

// Delete course by id
const deleteOrder = (req, res) => {
  // B1: Get data from request
  let orderId = req.params.orderId;

  // B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({
      message: "Product ID is invalid!"
    })
  }

  // B3: Call modal
  orderModel.findByIdAndDelete(orderId, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(204).json({
      message: "Delete order successfully"
    })
  })
}

// Export Course controller thành 1 module
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
}
