//khai báo thư viện express
const express = require('express');
const { CustomerMiddleware } = require('../middlewares/customerMiddleware');
const CustomerController = require('../controllers/CustomerController');

// Create router
const CustomerRouter = express.Router();

const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  loginUser
} = require('../controllers/customerController')


// Use middle ware
CustomerRouter.use(CustomerMiddleware);


//create a Customer
CustomerRouter.post('/customers', createCustomer);

//create a Customer
CustomerRouter.post('/login', loginUser);

//get all Customer
CustomerRouter.get('/customers', getAllCustomers);

//get a Customer
CustomerRouter.get('/customers/:customerId', getCustomerById)

//update a Customer
CustomerRouter.put('/customers/:customerId', updateCustomer)

//delete a Customer
CustomerRouter.delete('/customers/:customerId', deleteCustomer)

module.exports = { CustomerRouter };