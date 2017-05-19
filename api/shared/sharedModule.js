var utilMethods = {};
//var config    = require('../web-server/config/keys.js');
//var request   = require('request');

var helper    = require('sendgrid').mail;
var systemConfig = require("./stateOfX.js");

utilMethods.manageSendEmail = function(req, callback){
  console.log('manageSendEmail', req);
  callback({success: true, info: "mail has been sent"});
}

// function to send email by mandrill
// Input - emailId,emailVerificationToken,firstName
// utilMethods.sendEmail = function (argument) {
// 	console.log("argument in sendEmail ",argument);
// 	//var template_name = "emailVerification";
//   var template_content = [{
//     "name": "emailVerification",
//     "content": "Email Verification Link"
//   }];
//   var emailVerificationLink = "http://"+config.mandrillKeys.host + ":" +config.mandrillKeys.port + "/verifyEmail/?token="+ argument.emailVerificationToken;
//   var message = {
//     "global_merge_vars": [{
//       "name": "emailVerificationLink",
//       "content": emailVerificationLink
//     }],
//     "to": [{
//       "email": argument.emailId,
//       "name": !!argument.firstName ? argument.firstName : "user"
//     }]
//   }
//   mandrillClient.messages.sendTemplate({"message": message,"template_name": "emailVerification", "template_content": template_content}, function(result) {
//     console.log(result);
//   }, function(err) {
//     console.log("error in sending email at sign up",err);
//   })
// }

utilMethods.sendSendGridEmail = function(data, callback){
  console.log('send mail');
  from_email  = new helper.Email(data.from_email);
  to_email    = new helper.Email(data.to_email);
  subject     = data.subject;
  content     = new helper.Content("text/html", data.content);
  mail        = new helper.Mail(from_email, subject, to_email, content);

  console.log(stateOfX.SendGridApiKey);
  //var sg = require('sendgrid')(stateOfX.SendGridApiKey);
  var sg = require('sendgrid')(stateOfX.SendGridApiKey);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  console.log("going to send email in shared module",data)
  sg.API(request, function(error, response) {
    console.log("sent mail in shared module");
    console.log('response.statusCode',response.statusCode);
    console.log('response.body',response.body);
    console.log('response.headers',response.headers);
    return callback({success: true})
  })

}

//Request - {msg,mobileNumber}
// utilMethods.sendOtp = function(data, callback){
//   console.log("Inside sharedModule sendOtp");
//   var reqObject = {
//     "authentication": {
//       "username": systemConfig.sendSmsUsername,
//       "password": systemConfig.sendSmsPassword
//     },
//     "messages": [{
//       "sender": systemConfig.sendSmsSender,
//       "text": data.msg,
//       "recipients": [{
//         "gsm": data.mobileNumber
//       }]
//     }]
//   }
//   console.log("request reqObject in sendOtp - " + JSON.stringify(reqObject));  
//   var request = require('request');
//   request({
//       url: systemConfig.sendSmsUrl, //URL to hit
//       method: 'POST', //Specify the method
//       json : reqObject
//   }, function(error, response, body){
//       console.log(error, response.statusCode, body);
//       if(error) {
//           console.log(error);
//           callback({success : false})
//       } else {
//         if(response.statusCode == 200 && body.results[0].status == 0) {
//           callback({success : true})
//         } else {
//           callback({success : false})
//         }
//       }
//   });
// }


var createUniqueId = function (){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 10; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

module.exports = utilMethods;
