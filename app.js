// Import required modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Import the products route
const userRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const categoryRouter = require('./routes/category');
const app = express();

// Set up middleware
app.use(logger('dev')); // Logs incoming requests
app.use(express.json()); // Parses incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded data
app.use(cookieParser()); // Parses cookies

// Use the products router for routes starting with /products
app.use('/products', productsRouter);
app.use('/users', userRouter);
app.use('/category',categoryRouter)
// Handle 404 errors (page not found)
app.use((req, res) => {
  res.status(404).send('Not Found');
});

module.exports = app;
