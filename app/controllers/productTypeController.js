// Import thư viện mongoose
const mongoose = require("mongoose");

const ProductTypeModel = require('../model/productTypeModel');

// Create Product Types
const createProductType = (req, res) => {
  // Get data from request
  let bodyRequest = req.body;

  // Validation data
  if (!bodyRequest.name) {
    return res.status(400).json({
      message: "product name is required!"
    })
  }

  // Work with model
  let newProductTypeData = {
    _id: mongoose.Types.ObjectId(),
    name: bodyRequest.name,
    description: bodyRequest.description,
  }

  ProductTypeModel.create(newProductTypeData, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message,
        error: "something wrong when create product"
      })
    }

    return res.status(201).json({
      message: "Create successfully",
      newProductType: data
    })
  })
}

// Get all Product Types
const getAllProductTyeps = (req, res) => {
  // Get data from request
  // Validation data
  // Work with model
  ProductTypeModel.find((error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Get all Product Types successfully",
      ProductTypes: data
    })
  })
}

// Get Product Types by id
const getProductTyepById = (req, res) => {
  // Get data from request
  let ProductTypeid = req.params.productTypeId;

  // Validation data
  if (!mongoose.Types.ObjectId.isValid(ProductTypeid)) {
    return res.status(400).json({
      message: "Product Types ID is invalid!"
    })
  }

  // Work with model
  ProductTypeModel.findById(ProductTypeid, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(201).json({
      message: "Get Product Types successfully",
      productTypes: data
    })
  })
}

// Update Product Types by id
const updateProductTyep = (req, res) => {
  // Get data from request
  let ProductTypeid = req.params.productTypeId;
  let bodyRequest = req.body;

  // Validation data
  if (!mongoose.Types.ObjectId.isValid(ProductTypeid)) {
    return res.status(400).json({
      message: "Product Types ID is invalid!"
    })
  }

  if (!bodyRequest.name) {
    return res.status(400).json({
      message: "Name is required!"
    })
  }

  // Work with model
  let productTypeUpdate = {
    name: bodyRequest.name,
    description: bodyRequest.description,
  };

  ProductTypeModel.findByIdAndUpdate(ProductTypeid, productTypeUpdate, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Update Product Types successfully",
      updatedProductType: data
    })
  })
}

// Delete product type by id
const deleteProductTyep = (req, res) => {
  // Get data from request
  let ProductTypeid = req.params.productTypeId;

  // Validation data
  if (!mongoose.Types.ObjectId.isValid(ProductTypeid)) {
    return res.status(400).json({
      message: "Product Types ID is invalid!"
    })
  }

  // Work with model
  ProductTypeModel.findByIdAndDelete(ProductTypeid, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(204).json({
      message: "Delete Product Types successfully"
    })
  })
}

// Export Product Types controller
module.exports = {
  createProductType,
  getAllProductTyeps,
  getProductTyepById,
  updateProductTyep,
  deleteProductTyep
}
