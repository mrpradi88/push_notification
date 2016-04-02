var express = require('express');
var router = express.Router();
var subscribe = require('./../core/subscribe.js');


router.post('/', function(req, res, next) {
  subscribe.pushNotification(req,res,next)
});

module.exports = router;
