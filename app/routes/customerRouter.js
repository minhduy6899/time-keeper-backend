//khai báo thư viện express
const express = require('express');
const { CustomerMiddleware } = require('../middlewares/customerMiddleware');

// Create router
const CustomerRouter = express.Router();

const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  loginUser,
  logoutUser
} = require('../controllers/customerController')


// Use middle ware
CustomerRouter.use(CustomerMiddleware);


//create a Customer
CustomerRouter.post('/customers', createCustomer);

//login
CustomerRouter.post('/login', loginUser);

//logout
CustomerRouter.post('/logout', logoutUser);

//get all Customer
CustomerRouter.get('/customers', getAllCustomers);

//get a Customer
CustomerRouter.get('/customers/:customerId', getCustomerById)

//update a Customer
CustomerRouter.put('/customers/:customerId', updateCustomer)

//delete a Customer
CustomerRouter.delete('/customers/:customerId', deleteCustomer)

module.exports = { CustomerRouter };