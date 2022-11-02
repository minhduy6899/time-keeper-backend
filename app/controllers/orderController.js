// Import thư viện mongoose
const mongoose = require("mongoose");

const Orders = require("../model/ordersModel");
const orderModel = require('../model/orderModel');

// Create course
const createOrder = async (req, res) => {

  console.log('check req: ', req.body)

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
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
}

// get Single Order by Id
const getOrderById = async (req, res, next) => {
  const order = await Orders.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
};

// get logged in user  Orders
const myOrders = async (req, res, next) => {
  const orders = await Orders.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
};

// get all Orders -- Admin
const getAllOrders = async (req, res, next) => {
  const orders = await Orders.find();

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

// update Order Status -- Admin
const updateOrder = async (req, res, next) => {
  const order = await Orders.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
};

// delete Order -- Admin
const deleteOrder = async (req, res, next) => {
  const order = await Orders.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
};



// // Get all Order
// const getAllOrders = (req, res) => {
//   // B1: Get data from request
//   // B2: Validate data
//   // B3: Call modal
//   orderModel.find((error, data) => {
//     if (error) {
//       return res.status(500).json({
//         message: error.message
//       })
//     }

//     return res.status(200).json({
//       message: "Get all courses successfully",
//       Order: data
//     })
//   })
// }

// // Get Order by id
// const getOrderById = (req, res) => {
//   // B1: Get data from request
//   let orderId = req.params.orderId;

//   // B2: Validate data
//   if (!mongoose.Types.ObjectId.isValid(orderId)) {
//     return res.status(400).json({
//       message: "Course ID is invalid!"
//     })
//   }

//   // B3: Call modal
//   orderModel.findById(orderId, (error, data) => {
//     if (error) {
//       return res.status(500).json({
//         message: error.message
//       })
//     }

//     return res.status(201).json({
//       message: "Get Order successfully",
//       order: data
//     })
//   })
// }

// // Update Order by id
// const updateOrder = (req, res) => {
//   // B1: Get data from request
//   let orderId = req.params.orderId;
//   let bodyRequest = req.body;

//   // B2: Validate data
//   if (!mongoose.Types.ObjectId.isValid(orderId)) {
//     return res.status(400).json({
//       message: "ProductType ID is invalid!"
//     })
//   }

//   // Bóc tách trường hợp undefied
//   if (!bodyRequest.cost) {
//     return res.status(400).json({
//       message: "cost is required!"
//     })
//   }

//   // B3: Call modal
//   let orderUpdate = {
//     note: bodyRequest.note,
//     cost: bodyRequest.cost,
//   };

//   orderModel.findByIdAndUpdate(orderId, orderUpdate, (error, data) => {
//     if (error) {
//       return res.status(500).json({
//         message: error.message
//       })
//     }

//     return res.status(200).json({
//       message: "Update course successfully",
//       order: data
//     })
//   })
// }

// // Delete Order by id
// const deleteOrder = (req, res) => {
//   // B1: Get data from request
//   let orderId = req.params.orderId;

//   // B2: Validate data
//   if (!mongoose.Types.ObjectId.isValid(orderId)) {
//     return res.status(400).json({
//       message: "Product ID is invalid!"
//     })
//   }

//   // B3: Call modal
//   orderModel.findByIdAndDelete(orderId, (error, data) => {
//     if (error) {
//       return res.status(500).json({
//         message: error.message
//       })
//     }

//     return res.status(204).json({
//       message: "Delete order successfully"
//     })
//   })
// }

// Export Order controller thành 1 module
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  myOrders
}
