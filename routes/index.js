var express = require('express');
var router = express.Router();

/* GET home page. */

var mysql = require('mysql')
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'ubuntu',
	password: '3gFRpfmysql',
	database: 'express_db'
})

router.get('/', function(req, res, next) {
  res.removeHeader('X-Powered-By');
  //res.removeHeader('server');
  const sql = 'select * from ps_account';
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  connection.query(sql, function(err, result, fields){
    if (err) throw err;
    res.render('index', { title: 'Index Page.', ip: ip, sql_response: result });
  });
});

module.exports = router;
