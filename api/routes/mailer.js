var stateOfX       	= require('../shared/stateOfX.js'),
	helper    		= require('sendgrid').mail,
	async          	= require("async"),
	sharedModule   	= require('../shared/sharedModule.js');



var mailer = {};

console.log('stateOfX', stateOfX);

mailer.manageSendEmail = function(req, callback){
	//callback({success: true, info: "manage send email"});
	console.log('manage send email with multiple platform');


	var param = {};
	param.from_email = stateOfX.mailMessages.from_email;
	param.to_email = req.email;
	param.subject = stateOfX.mail_subject;


	async.waterfall([
			async.apply(sendViaSendGridEmail, param), //manage send grig mail
						sendViaMandrillEmail,
						sendViaMailgunEmail,
						sendViaAwsProvider
		], function(err, result){
			console.log(err, result);
			if(err){
				if(err.success){
					callback({success: true, info: "E mail has been sent successfully"});
				} else {

					callback({success: false, info: "there are issue on third party mailer"});
				}
			} else {
				callback({success: true, info: "E mail has been sent successfully"});
			}
		})
}

//send mail via send grid
var sendViaSendGridEmail = function(param, callback){
  console.log('send mail sendViaSendGridEmail', param);
  

  from_email  = new helper.Email(param.from_email);
  to_email    = new helper.Email(param.to_email);
  subject     = param.subject;
  content     = new helper.Content("text/html", param.content);
  mail        = new helper.Mail(from_email, subject, to_email, content);

  console.log(stateOfX.SendGridApiKey);
  //var sg = require('sendgrid')(stateOfX.SendGridApiKey);
  var sg = require('sendgrid')(stateOfX.SendGridApiKey);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    /*console.log("sent mail in shared module", response);
    console.log('response.statusCode',response.statusCode);
    console.log('response.body',response.body);
    console.log('response.headers',response.headers);*/
    if(response.statusCode === 400){
    	console.log('mail has been send successfully');
    	callback({success: true})
    } else {
    	console.log('Needs to be sent to other mail service provider');
    	callback(null, param);
    }
    
  })

}
//send email via mandrill
var sendViaMandrillEmail = function(param, callback){
	console.log('send mail sendViaMandrillEmail', param);
	callback(null, param);
}


//send email via mandrill
var sendViaMailgunEmail = function(param, callback){
	console.log('send mail sendViaMailgunEmail', param);
	callback(null, param);
}

//send via sendViaAwsProvider
var sendViaAwsProvider = function(param, callback){
	console.log('send mail sendViaAwsProvider', param);
	callback(null, param);
}

module.exports = mailer;