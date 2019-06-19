const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home/index', {
    title: 'Trang chủ',
    path: {
      link: ['/'],
      dirs: ['Trang chủ']
    },
    searchId: 'indexSearch'
  });
});

module.exports = router;
