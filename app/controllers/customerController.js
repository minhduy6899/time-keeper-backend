// Import thư viện mongoose
const mongoose = require("mongoose");
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const customerModel = require('../model/customerModel');

// Create user
// const createCustomer = (req, res) => {
//   // B1: Get data from request
//   let bodyRequest = req.body;

//   // B2: Validate data
//   if (!bodyRequest.fullName) {
//     return res.status(400).json({
//       message: "fullName is required!"
//     })
//   }

//   if (!bodyRequest.phone) {
//     return res.status(400).json({
//       message: "phone is required!"
//     })
//   }

//   if (!bodyRequest.email) {
//     return res.status(400).json({
//       message: "email is required!"
//     })
//   }

//   if (!bodyRequest.address) {
//     return res.status(400).json({
//       message: "address is required!"
//     })
//   }

//   if (!bodyRequest.city) {
//     return res.status(400).json({
//       message: "city is required!"
//     })
//   }

//   if (!bodyRequest.country) {
//     return res.status(400).json({
//       message: "country is required!"
//     })
//   }

//   // B3: Call model
//   let newCustomerData = {
//     _id: mongoose.Types.ObjectId(),
//     fullName: bodyRequest.fullName,
//     phone: bodyRequest.phone,
//     email: bodyRequest.email,
//     address: bodyRequest.address,
//     city: bodyRequest.city,
//     country: bodyRequest.country,
//   }

//   customerModel.create(newCustomerData, (error, data) => {
//     if (error) {
//       return res.status(500).json({
//         message: error.message,
//         error: "something wrong when create user"
//       })
//     }

//     return res.status(201).json({
//       message: "Create successfully",
//       newCustomer: data
//     })
//   })
// }

// @route POST customer
// @desc Register user
// @access Public
const createCustomer = async (req, res) => {
  const { username, password, fullName, phone, address } = req.body

  // Simple validation
  if (!username || !password || !fullName || !phone || !address)
    return res
      .status(400)
      .json({ success: false, message: 'Missing username and/or password or some info' })

  try {
    // Check for existing user
    const user = await customerModel.findOne({ username })

    if (user)
      return res
        .status(400)
        .json({ success: false, message: 'Username already taken' })

    // All good
    const hashedPassword = await argon2.hash(password)
    const newUser = new customerModel({
      username,
      password: hashedPassword,
      fullName,
      phone,
      address
    })
    await newUser.save()

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    )

    res.json({
      success: true,
      message: 'User created successfully',
      accessToken
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

// @route POST /login
// @desc Login user
// @access Public
const loginUser = async (req, res) => {
  const { username, password } = req.body

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: 'Missing username and/or password' })

  try {
    // Check for existing user
    const user = await customerModel.findOne({ username })
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect username or password' })

    // Username found
    const passwordValid = await argon2.verify(user.password, password)
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect username or password' })

    // All good
    // Return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    )

    res.json({
      success: true,
      message: 'User logged in successfully',
      accessToken
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

// Get all user
const getAllCustomers = (req, res) => {
  // B1: Get data from request
  // B2: Validate data
  // B3: Call model
  customerModel.find((error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Get all user successfully",
      customer: data
    })
  })
}

// Get course by id
const getCustomerById = (req, res) => {
  // B1: Get data from request
  let customerId = req.params.customerId;

  // B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res.status(400).json({
      message: "User ID is invalid!"
    })
  }

  // B3: Call model
  customerModel.findById(customerId, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(201).json({
      message: "Get Customer successfully",
      customer: data
    })
  })
}

// Update course by id
const updateCustomer = (req, res) => {
  // B1: Get data from request
  let customerId = req.params.customerId;
  let bodyRequest = req.body;

  // B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res.status(400).json({
      message: "User ID is invalid!"
    })
  }

  // Bóc tách trường hợp undefied
  if (!bodyRequest.email) {
    return res.status(400).json({
      message: "Email is required!"
    })
  }

  // B3: Call model
  let customerUpdate = {
    fullName: bodyRequest.fullName,
    phone: bodyRequest.phone,
    email: bodyRequest.email,
    address: bodyRequest.address,
    city: bodyRequest.city,
    country: bodyRequest.country,
  };

  customerModel.findByIdAndUpdate(customerId, customerUpdate, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Update user successfully",
      customer: data
    })
  })
}

// Delete user by id
const deleteCustomer = (req, res) => {
  // B1: Get data from request
  let customerId = req.params.customerId;

  // B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res.status(400).json({
      message: "User ID is invalid!"
    })
  }

  // B3: Call model
  customerModel.findByIdAndDelete(customerId, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(204).json({
      message: "Delete user successfully"
    })
  })
}

// Export user controller 
module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  loginUser
}
