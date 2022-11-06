//khai báo thư viện express
const express = require('express');
// const { OrderMiddleware } = require('../middlewares/OrderMiddleware');
// const Drink = require('../model/drinkModel');
// const OrderController = require('../controllers/OrderController');
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


// use middle ware
// OrderRouter.use(OrderMiddleware);


//create a Order
OrderRouter.post('/orders', isAuthenticatedUser, createOrder);

//get all Order
OrderRouter.get('/orders', getAllOrders);

//get a Order
OrderRouter.get('/orders/me', isAuthenticatedUser, getMyOrders)

//update a Order (Admin)
OrderRouter.put('/orders/:orderId', authorizeRoles("admin"), updateOrder)

//delete a Order (Admin)
OrderRouter.delete('/orders/:orderId', authorizeRoles("admin"), deleteOrder)

module.exports = { OrderRouter };