//khai báo thư viện express
const express = require('express');
const { orderDetailMiddleware } = require('../middlewares/orderDetailMiddleware');
const orderDetatilController = require('../controllers/orderDetatilController');
// Create router
const OrderDetailRouter = express.Router();

const {
  createOrderDetail,
  getAllOrderDetails,
  getOrderDetailById,
  updateOrderDetail,
  deleteOrderDetail
} = require('../controllers/orderDetatilController')

// Use middle ware
OrderDetailRouter.use(orderDetailMiddleware);

// Create a OrderDetail
OrderDetailRouter.post('/orderDetails', createOrderDetail);

// Get all OrderDetail
OrderDetailRouter.get('/orderDetails', getAllOrderDetails);

// Get a OrderDetail
OrderDetailRouter.get('/orderDetails/:orderDetailId', getOrderDetailById)

// Update a OrderDetail
OrderDetailRouter.put('/orderDetails/:orderDetailId', updateOrderDetail)

// Delete a OrderDetail
OrderDetailRouter.delete('/orderDetails/:orderDetailId', deleteOrderDetail)

module.exports = { OrderDetailRouter };