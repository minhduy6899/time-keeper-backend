// Import thư viện mongoose
const mongoose = require("mongoose");
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const customerModel = require('../model/customerModel');

// Create user
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
    // const hashedPassword = await argon2.hash(password)
    const hashedPassword = bcrypt.hashSync(password, 10);
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
      { id: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    )
    const newUserRegister = await customerModel.findOne({ username })
    res.json({
      success: true,
      message: 'User created successfully',
      accessToken,
      user: newUserRegister
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

// Login user
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
    // const passwordValid = await argon2.verify(user.password, password)
    const passwordValid = bcrypt.compare(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect password' })

    // All good
    // Return token
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET
    )
    res.json({
      success: true,
      message: 'User logged in successfully',
      accessToken,
      user: user
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

//  Log out user
const logoutUser = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Log out success",
  });
};

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

  // B3: Call model
  let customerUpdate = {
    fullName: bodyRequest.fullName,
    phone: bodyRequest.phone,
    email: bodyRequest.email,
    address: bodyRequest.address,
    city: bodyRequest.city,
    country: bodyRequest.country,
    role: bodyRequest.role,
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

    return res.status(200).json({
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
  loginUser,
  logoutUser
}
