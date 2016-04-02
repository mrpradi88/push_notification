var webPush = require('web-push');
var GCM_API_KEY = "";
webPush.setGCMAPIKey(GCM_API_KEY);

var notificationmodule = {}
notificationmodule.pushNotification(req,res,next){
var redis = new Redis();
  redis.get("subscribers"function(err,result){
    if(err){
      var error = new Error();
      error.message = err;
    next(err);
    }
    if(result){
      result.forEach(function(item){
        if(item.siteid !== req.siteid){
            setTimeout(function() {
        webPush.sendNotification(req.endpoint, {
          TTL: req.query.ttl,
        })
        .then(function() {
          res.sendStatus(201);
        });
      }, req.query.delay * 1000);
        }
        }
      })
    }else{
      var error = new Error();
      error.message = "Something goes wrong while getting data from redis.";
      next(err);
    }
    
  });
}
module.exports=notificationmodule;