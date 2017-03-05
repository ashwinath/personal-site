var nodemailer  = require('nodemailer'),
    credentials = require('../credentials/credentials.js');

var EmailManager = {

  // formatting shld be done prior to this
  // returns false if not sent, true if sent
  sendEmail: (subject, messageObject, formatter) => {
    var transporter = nodemailer.createTransport(credentials.email);
    var emailText = formatter ? formatter(messageObject) : messageObject;
    var mailOptions = {
      from: credentials.email.auth.user,
      to: credentials.myEmail,
      subject: subject,
      text: emailText
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log('Message sent: ' + info.response);
        return true;
      }
    });
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
