var express 		= require('express'),
  	router    		= express.Router(),

	mailer 			= require("./mailer.js");


router.get('/', function(req, res){
		res.send({sucess : true, info: "this is default message "});
})

router.get('/test', function(req, res){
	res.send({sucess: true, info: "this is testing message"});
})
//manage route for sending email
router.post('/sendEmail', function(req, res){
	//console.log(req.body);
	//var data = {email : "rupank.srivastava@gmail.com"}
	mailer.manageSendEmail(req.body, function(result){
		res.send(result);
	});
})

module.exports = router;