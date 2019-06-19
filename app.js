const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Load Routes
const index = require('./routes/api/index');
const inventory = require('./routes/api/inventory');
const orders = require('./routes/api/orders');
const customers = require('./routes/api/customers');
const reports = require('./routes/api/reports');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static assets setup
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', index);
app.use('/orders', orders);
app.use('/inventory', inventory);
app.use('/customers', customers);
app.use('/reports', reports);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
