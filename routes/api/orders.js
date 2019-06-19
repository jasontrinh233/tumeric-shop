const express = require('express');
const router = express.Router();

/*
 * @Router  GET /orders
 * @desc    Order manager page
 * @access  Protected
 */
router.get('/', function(req, res) {
  res.render('orders/index', {
    title: 'Đơn hàng',
    path: {
      link: ['/orders'],
      dirs: ['Đơn hàng']
    },
    searchId: 'orderSearch'
  });
});

/*
 * @Router  GET /orders/add
 * @desc    Add order page
 * @access  Protected
 */
router.get('/add', function(req, res) {
  res.render('orders/add_order', {
    title: 'Đơn hàng',
    path: {
      link: ['/orders', '/orders/add'],
      dirs: ['Đơn hàng', 'Thêm đơn hàng']
    },
    searchId: 'addOrderSearch'
  });
});

module.exports = router;
