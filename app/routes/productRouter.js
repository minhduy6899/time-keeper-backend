//khai báo thư viện express
const express = require('express');
const { productMiddleware } = require('../middlewares/productMiddleware');
// const Drink = require('../model/drinkModel');
// const productController = require('../controllers/productController');
//tạo router
const ProductRouter = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getLimitProducts,
  getProductsFilter
} = require('../controllers/productController')


//sủ dụng middle ware
ProductRouter.use(productMiddleware);

//create a product
ProductRouter.post('/products', createProduct);

//get all product
ProductRouter.get('/allProducts', getAllProducts);

//get limit product
ProductRouter.get('/products', getLimitProducts);

//get filter product
ProductRouter.get('/productsFilter', getProductsFilter);

//get a product
ProductRouter.get('/products/:productId', getProductById)

//update a product
ProductRouter.put('/products/:productId', updateProduct)

//delete a product
ProductRouter.delete('/products/:productId', deleteProduct)

module.exports = { ProductRouter };