var express = require('express');
var router = express.Router();
var subscribe = require('./../core/subscribe.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  subscribe.userSubscribe(req,res,next)
});
router.post('/', function(req, res, next) {
  subscribe.userSubscribe(req,res,next)
});

module.exports = router;
