var debug = require('debug')('choresapp');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  debug('test called');
  res.render('test', { title: 'Test shit' });
});

module.exports = router;
