/**
 * Created by Rupak 
 */
var stateOfX = {};

stateOfX.gameDetails      = {};
stateOfX.gameDetails.name = "Manage mailer using Rest API";


//SENDGRID_API_KEY
stateOfX.SendGridApiKey = "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";

//Mail Related Messages
stateOfX.mailMessages                           = {};

//mail to affiliate
stateOfX.mailMessages.from_email                = "support@megapoker.com";
stateOfX.mailMessages.mail_subjectAffiliate     = "your affiliate request is processed";
stateOfX.mailMessages.mail_contentAffiliate     = "Hello,Your request has been proceed. Admin will contact ASAP";
stateOfX.mailMessages.mail_subjectAffiliateEdit = "Affiliate profile update";
stateOfX.mailMessages.mail_contentAffiliateEdit = "Affiliate your profile has been updated";


module.exports = stateOfX;
