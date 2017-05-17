var mailer = {};

mailer.manageSendEmail = function(req, callback){
	callback({success: true, info: "manage send email"});
}


module.exports = mailer;