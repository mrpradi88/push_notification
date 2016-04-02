var Redis = require('ioredis');
var subscriber = {}
subscriber.userSubscribe = function(req,res,next){
	console.log("REQ CAME:",req.body);
	var age = req.body.custom_parameter_age;
	var isMobile = req.useragent.isMobile;
	var redis = new Redis();
	redis.get("subscribers"function(err,result){
		if(err){
			var error = new Error();
			error.message = err;
		next(err);
		}
		if(result){
			result.forEach(function(item){
				if(item.subscriber_id !== req.subscriber_id){
					var userData = {"siteid":req.siteid,"subscriber_id":req.subscriber_id,"age":age,"ismobile":isMobile,"notification_endpoint":req.endpoint};					result.push(userData)
					redis.set("subscribers",userData);
					res.status = 201;
					res.json({});
				}else{
					res.json({error: false, existing: true, message: "You have already subscribed to this channel"}
)
				}
			})
		}else{
			var error = new Error();
			error.message = "Something goes wrong while getting data from redis.";
			next(err);
		}
		
	});
	
	//res.render('index')
	
}

module.exports = subscriber;