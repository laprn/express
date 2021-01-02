var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.removeHeader('X-Powered-By');
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.render('index', { title: 'Index Page.', ip: ip });
});

module.exports = router;
