var assert = require('assert'),
    EmailManager = require('../mediators/EmailManager');

// Test email
// Mail wont actually be sent since it takes some time to send and its performed asynchronously
describe('Test sending an email', () => {
  it('Checks if email has been sent', () => {
    var messageObject = {
      name: 'Mocha Test',
      email: 'MochaTest@testing.com',
      phone: '12345678',
      message: 'Standard Lorem Ipsum'
    };
    EmailManager.sendEmail('Test Email', messageObject, EmailManager.formatContactMe, (err, info) => {
      assert(err);
    });
  });
});
