var stateOfX       = require('../shared/stateOfX.js');


var mailer = {};

console.log('stateOfX', stateOfX);

mailer.manageSendEmail = function(req, callback){
	callback({success: true, info: "manage send email"});
}


module.exports = mailer;