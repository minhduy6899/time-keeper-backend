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
  deleteOrder
} = require('../controllers/orderController')


// use middle ware
// OrderRouter.use(OrderMiddleware);


//create a Order
OrderRouter.post('/orders', createOrder);

//get all Order
OrderRouter.get('/orders', getAllOrders);

//get a Order
OrderRouter.get('/orders/:orderId', getOrderById)

//update a Order
OrderRouter.put('/orders/:orderId', updateOrder)

//delete a Order
OrderRouter.delete('/orders/:orderId', deleteOrder)

module.exports = { OrderRouter };