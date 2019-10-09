var path = require('path');
var Promise = require('bluebird');
var MailDev = require('maildev');
var maildev = new MailDev();

module.exports = {
  listen: function() {
    return new Promise(function(resolve, reject) {
      maildev.on('new', function(email) {
        return resolve(email);
      });
    });
  },
  serverListen: function() {
    return new Promise(function(resolve, reject) {
      maildev.listen(function() {
        return resolve();
      });
    });
  },
  serverClose: function() {
    return new Promise(function(resolve, reject) {
      maildev.close(function() {
        return resolve();
      });
    });
  }
};
