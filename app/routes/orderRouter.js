//khai báo thư viện express
const express = require('express');

//tạo router
const OrderRouter = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMyOrders
} = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authMiddleware');

//create a Order
OrderRouter.post('/orders', isAuthenticatedUser, createOrder);

//get all Order
OrderRouter.get('/orders', getAllOrders);

//get order by id
OrderRouter.get('/orders/:orderId', getOrderById);

//get a Order
OrderRouter.get('/orders/me', isAuthenticatedUser, getMyOrders)

//update a Order (Admin)
OrderRouter.put('/orders/:orderId', updateOrder)

//delete a Order (Admin)
OrderRouter.delete('/orders/:orderId', deleteOrder)

module.exports = { OrderRouter };