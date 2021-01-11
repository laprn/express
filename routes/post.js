var express = require('express');
var dateformat = require('dateformat');
var router = express.Router();

/* GET home page. */

var mysql = require('mysql')
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'ubuntu',
	password: '3gFRpfmysql',
	database: 'express_db',
	dateStrings: 'date'
})

router.get('/', function(req, res, next) {
  res.removeHeader('X-Powered-By');
  const sql = 'select * from blog';

  connection.query(sql, function(err, result, fields){
    res.render('post', { title: 'Post', posts: result });
  });
});

module.exports = router;
