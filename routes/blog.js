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
    res.render('blog_index', { title: 'Blog Index', posts: result });
  });
});

router.get('/:path', (req, res) => {
  res.removeHeader('X-Powered-By');
  var path = req.params.path
  const sql = 'select * from blog where path = ?';
  connection.query(sql, path, function(err, result, fields){
    if (result[0]==null){
      res.removeHeader('X-Powered-By');
      res.render('404', {title: '404.'});

    }
    res.render('blog', { title: result[0].title, date: result[0].date, content: result[0].content})
  });
});
module.exports = router;
