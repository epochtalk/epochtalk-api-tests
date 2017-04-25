var path = require('path');
var Promise = require('bluebird');
var MailDev = require('maildev');
var maildev = new MailDev();
maildev.listen();

module.exports = {
  listen: function() {
    return new Promise(function(resolve, reject) {
      maildev.on('new', function(email) {
        return resolve(email);
      });
    });
  }
};
