//khai báo thư viện express
const express = require('express');
const { productTypeMiddleware } = require('../middlewares/productTypeMiddleware');
// const Drink = require('../model/drinkModel');
// const productController = require('../controllers/productController');
//tạo router
const ProductTypeRouter = express.Router();

const {
  createProductType,
  getAllProductTyeps,
  getProductTyepById,
  updateProductTyep,
  deleteProductTyep
} = require('../controllers/productTypeController')


//use middle ware
ProductTypeRouter.use(productTypeMiddleware);


//create a productType
ProductTypeRouter.post('/productTypes', createProductType);

//get all productType
ProductTypeRouter.get('/productTypes', getAllProductTyeps);

//get a productType
ProductTypeRouter.get('/productTypes/:productTypeId', getProductTyepById)

//update a productType
ProductTypeRouter.put('/productTypes/:productTypeId', updateProductTyep)

//delete a productType
ProductTypeRouter.delete('/productTypes/:productTypeId', deleteProductTyep)

module.exports = { ProductTypeRouter };