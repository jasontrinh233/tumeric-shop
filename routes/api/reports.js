const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('reports', { title: 'Báo cáo' });
  res.render('reports/index', {
    title: 'Báo cáo',
    path: {
      link: ['/reports'],
      dirs: ['Báo cáo']
    },
    searchId: 'reportSearch'
  });
});

module.exports = router;
