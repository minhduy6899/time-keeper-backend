// Import thư viện mongoose
const mongoose = require("mongoose");

const productModel = require('../model/productModel');

// Create product
const createProduct = (req, res) => {
  // B1: Get data from request
  let bodyRequest = req.body;

  // B2: validate
  if (!bodyRequest.name) {
    return res.status(400).json({
      message: "product name is required!"
    })
  }

  if (!bodyRequest.imageUrl) {
    return res.status(400).json({
      message: "product imageUrl is required!"
    })
  }

  if (!bodyRequest.buyPrice) {
    return res.status(400).json({
      message: "product buyPrice is required!"
    })
  }

  if (!bodyRequest.promotionPrice) {
    return res.status(400).json({
      message: "product promotionPrice is required!"
    })
  }

  // B3: Call model
  let newProductData = {
    _id: mongoose.Types.ObjectId(),
    name: bodyRequest.name,
    description: bodyRequest.description,
    buyPrice: bodyRequest.buyPrice,
    promotionPrice: bodyRequest.promotionPrice,
    imageUrl: bodyRequest.imageUrl,
    thumbnail:
    {
      img1: bodyRequest.thumbnail.img1,
      img2: bodyRequest.thumbnail.img2,
      img3: bodyRequest.thumbnail.img3
    },
    category: bodyRequest.category,
    badge: bodyRequest.badge,
    color: bodyRequest.color,
    size: bodyRequest.size,
    ratings: bodyRequest.ratings,
    amount: bodyRequest.amount
  }

  productModel.create(newProductData, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message,
        error: "something wrong when create product"
      })
    }

    return res.status(201).json({
      message: "Create successfully",
      newProduct: data
    })
  })
}

// Get all product
const getAllProducts = (req, res) => {
  // B1: Get data from request
  const limitProduct = parseInt(req.query.limit)
  // B2: validate
  // B3: Call model
  productModel
    .find()
    .limit(limitProduct)
    .exec((error, data) => {
      if (error) {
        return res.status(500).json({
          message: error.message
        })
      }

      return res.status(200).json({
        message: "Get all products successfully",
        products: data
      })
    })
}

// Get limit product
const getLimitProducts = async (req, res) => {
  // B1: Get data from request
  const { limit, productName, minPrice, maxPrice, productCategories, productColor, productSize, sortProducts } = req.query
  // B2: validate
  // B3: Call model
  // productModel
  productModel
    .find((productCategories === 'ALL' && productColor === 'ALL' && productSize === 'ALL') ? {} :
      (productCategories !== 'ALL' && productColor === 'ALL' && productSize === 'ALL') ?
        { category: productCategories } :
        (productCategories === 'ALL' && productColor !== 'ALL' && productSize === 'ALL') ?
          { color: productColor } :
          (productCategories === 'ALL' && productColor === 'ALL' && productSize !== 'ALL') ?
            { size: productSize } :
            (productCategories !== 'ALL' && productColor !== 'ALL' && productSize === 'ALL') ?
              { category: productCategories, color: productColor } :
              (productCategories !== 'ALL' && productColor === 'ALL' && productSize !== 'ALL') ?
                { category: productCategories, size: productSize } :
                (productCategories === 'ALL' && productColor !== 'ALL' && productSize !== 'ALL') ?
                  { color: productColor, size: productSize } :
                  { category: productCategories, size: productSize, color: productColor })
    .limit(limit)
    .sort(sortProducts === 'name' ? { name: "ascending" } : sortProducts === 'price' ? { promotionPrice: "ascending" } : {})
    .exec((error, data) => {
      if (error) {
        return res.status(500).json({
          message: error.message
        })
      }

      return res.status(200).json({
        message: "Get all products successfully",
        products: data.filter((item, index) => {
          if (!productName || productName === "ALL") {
            if (!minPrice || minPrice === 0 && !maxPrice || maxPrice === 1000) {
              return true
            } else {
              return item.promotionPrice <= maxPrice && item.promotionPrice >= minPrice
            }
          }
          else {
            if (!minPrice || minPrice === 0 && !maxPrice || maxPrice === 1000) {
              return item.name.toLowerCase().includes(productName.toLowerCase())

            } else {
              return item.name.toLowerCase().includes(productName.toLowerCase()) &&
                (item.promotionPrice <= maxPrice && item.promotionPrice >= minPrice)
            }

          }
        })
      })
    })

}

// Get product by id
const getProductById = (req, res) => {
  // B1: Get data from request
  let productId = req.params.productId;

  // B2: validate
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      message: "product ID is invalid!"
    })
  }

  // B3: Call model
  productModel.findById(productId, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(201).json({
      message: "Get ProductType successfully",
      product: data
    })
  })
}

// Get product filter
const getProductsFilter = (req, res) => {
  // B1: Get data from request
  let productId = req.params.productId;

  // B2: validate
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      message: "product ID is invalid!"
    })
  }

  // B3: Call model
  productModel.findById(productId, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(201).json({
      message: "Get ProductType successfully",
      product: data
    })
  })
}

// Update product by id
const updateProduct = (req, res) => {
  // B1: Get data from request
  let productId = req.params.productId;
  let bodyRequest = req.body;

  // B2: validate
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      message: "ProductType ID is invalid!"
    })
  }

  if (!bodyRequest.name) {
    return res.status(400).json({
      message: "Ma nuoc uong is required!"
    })
  }

  // B3: Call model
  let productUpdate = {
    name: bodyRequest.name,
    description: bodyRequest.description,
    imageUrl: bodyRequest.imageUrl,
    buyPrice: bodyRequest.buyPrice,
    promotionPrice: bodyRequest.promotionPrice,
    amount: bodyRequest.amount,
  };

  productModel.findByIdAndUpdate(productId, productUpdate, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Update product successfully",
      product: data
    })
  })
}

// Delete product by id
const deleteProduct = (req, res) => {
  // B1: Get data from request
  let Productid = req.params.productId;

  // B2: validate
  if (!mongoose.Types.ObjectId.isValid(Productid)) {
    return res.status(400).json({
      message: "Product ID is invalid!"
    })
  }

  // B3: Call model
  productModel.findByIdAndDelete(Productid, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(204).json({
      message: "Delete product successfully"
    })
  })
}

// Export product controller 
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getLimitProducts,
  getProductsFilter
}
