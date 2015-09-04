var debug = require('debug')('choresapp');
var express = require('express');
var sqlite3 = require("sqlite3").verbose();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  debug('test called');
  res.render('test', { title: 'Test shit', name: 'Eirik', names: ['Nils', 'Petter', 'Jens'] });
});

module.exports = router;
