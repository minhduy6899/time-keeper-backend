// Import thư viện mongoose
const mongoose = require("mongoose");

const orderDetailModel = require('../model/orderDetailModel');

// Create order detail
const createOrderDetail = (req, res) => {
  // B1: Get data
  let bodyRequest = req.body;

  // B2: Validate data
  if (!bodyRequest.quantity) {
    return res.status(400).json({
      message: "quantity is required!"
    })
  }

  // B3: Call model
  let newOrderData = {
    _id: mongoose.Types.ObjectId(),
    quantity: bodyRequest.quantity
  }


  orderDetailModel.create(newOrderData, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message,
        error: "something wrong when create orderdetail"
      })
    }

    return res.status(201).json({
      message: "Create successfully",
      newOrderDetail: data
    })
  })
}

// Get all course
const getAllOrderDetails = (req, res) => {
  // B1: Get data
  // B2: Validate data
  // B3: Call model
  orderDetailModel.find((error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Get all orderdetail successfully",
      OrderDetail: data
    })
  })
}

// Get course by id
const getOrderDetailById = (req, res) => {
  // B1: Get data
  let orderDetailId = req.params.orderDetailId;

  // B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(orderDetailId)) {
    return res.status(400).json({
      message: "Course ID is invalid!"
    })
  }

  // B3: Call model
  orderDetailModel.findById(orderDetailId, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(201).json({
      message: "Get Orderdetail successfully",
      orderdetail: data
    })
  })
}

// Update course by id
const updateOrderDetail = (req, res) => {
  // B1: Get data
  let orderDetailId = req.params.orderDetailId;
  let bodyRequest = req.body;

  // B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(orderDetailId)) {
    return res.status(400).json({
      message: "ProductType ID is invalid!"
    })
  }

  // Bóc tách trường hợp undefied
  if (!bodyRequest.quantity) {
    return res.status(400).json({
      message: "cost is required!"
    })
  }

  // B3: Call model
  let orderDetailUpdate = {
    quantity: bodyRequest.quantity
  };

  orderDetailModel.findByIdAndUpdate(orderDetailId, orderDetailUpdate, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Update orderdetail successfully",
      orderdetail: data
    })
  })
}

// Delete course by id
const deleteOrderDetail = (req, res) => {
  // B1: Get data
  let orderDetailId = req.params.orderDetailId;

  // B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(orderDetailId)) {
    return res.status(400).json({
      message: "Product ID is invalid!"
    })
  }

  // B3: Call model
  orderDetailModel.findByIdAndDelete(orderDetailId, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(204).json({
      message: "Delete orderdetail successfully"
    })
  })
}

// Export Course controller thành 1 module
module.exports = {
  createOrderDetail,
  getAllOrderDetails,
  getOrderDetailById,
  updateOrderDetail,
  deleteOrderDetail
}
