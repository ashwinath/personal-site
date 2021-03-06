var nodemailer  = require('nodemailer'),
    credentials = require('../credentials/credentials.js');

var EmailManager = {

  // formatting shld be done prior to this
  // returns false if not sent, true if sent
  sendEmail: (subject, messageObject, formatter, callback) => {
    var transporter = nodemailer.createTransport(credentials.email);
    var emailText = formatter ? formatter(messageObject) : messageObject;
    var mailOptions = {
      from: credentials.email.auth.user,
      to: credentials.myEmail,
      subject: subject,
      text: emailText
    }
    console.log(`Sending email.
        Contents: ${emailText}`);
    transporter.sendMail(mailOptions, callback);
  },

  // helper function to format email
  // Schema shld be as follows: 
  // {
  //   name:
  //   email:
  //   phone:
  //   message:
  // }
  formatContactMe: message => {
    var emailMessageFormatted = 
      'Name: ' + message.name + '\n' +
      'Email: ' + message.email + '\n' +
      'Phone: ' + message.phone + '\n' +
      'Message: ' + message.message;
    return emailMessageFormatted;
  }
}

module.exports = EmailManager;
