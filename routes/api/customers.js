const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('customers/index', {
    title: 'Khách hàng',
    path: {
      link: ['/customers'],
      dirs: ['Khách hàng']
    },
    searchId: 'customerSearch'
  });
});

module.exports = router;
