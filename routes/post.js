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
	dateStrings: true 
})

router.get('/', function(req, res, next) {
  res.removeHeader('X-Powered-By');
  const sql = 'select * from blog';

  connection.query(sql, function(err, result, fields){
    res.render('post', { title: 'Post', posts: result });
  });
});

router.post('/add', (req, res, next) => {
  res.removeHeader('X-Powerd-By');
  var title = req.body['title'];
  var path = req.body['path'];
  var content = req.body['content'];
  var data = {'title': title, 'path': path, 'content': content};

  const sql = 'INSERT INTO blog set ?';
  connection.query(sql, data, function(err, result, fields){
    res.redirect('/blog');
  });
});

router.post('/edit', (req, res, next) => {
  res.removeHeader('X-Powerd-By');
  var title = req.body['title'];
  var path = req.body['path'];
  var content = req.body['content'];
  var data = {'title': title, 'path': path, 'content': content};

  const sql = 'update blog set ? where path = ?';
  connection.query(sql, [data, path], function(err, result, fields){
    res.redirect('/blog');
  });
});

module.exports = router;
