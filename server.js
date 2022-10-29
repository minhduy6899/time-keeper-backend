//Define express
const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { ProductTypeRouter } = require('./app/routes/productTypeRouter');
const { ProductRouter } = require('./app/routes/productRouter');
const { CustomerRouter } = require('./app/routes/customerRouter');
const { OrderRouter } = require('./app/routes/orderRouter');
const { OrderDetailRouter } = require('./app/routes/orderDetailRouter');
const { authMiddleware } = require('./app/middlewares/authMiddleware');

// Define nodejs
const app = new express();

// Use body json
app.use(express.json());

// Use body unicode
app.use(express.urlencoded({
  extended: true
}))

// Use cors for access
app.use(cors())

// Define port to run app
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

const db = require('./config/db');
// Connect to DB
db.connect();

app.get('/', (request, response) => {

  let today = new Date();
  console.log(`Hôm nay là ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`);

  response.status(200).json({
    message: `Hôm nay là ngày ${today.getDate()} tháng ${today.getMonth() + 1} năm ${today.getFullYear()}`
  })
})

// Use router
app.use('/', ProductTypeRouter);
app.use('/', ProductRouter);
app.use('/', CustomerRouter);
app.use('/', OrderRouter);
app.use('/', OrderDetailRouter);

// Use middleware
app.use("/", authMiddleware);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.listen(PORT, HOST, () => {
  console.log(`App chạy trên cổng ${PORT}`);
})