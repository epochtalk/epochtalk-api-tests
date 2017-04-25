var path = require('path');
var Promise = require('bluebird');
var _ = require('lodash');
var chakram = require('chakram');
var config = require(path.join(__dirname, 'config'));
var root = config.emailerHost;

var MailDev = require('maildev');
var maildev = new MailDev();
maildev.listen();

module.exports = {
  getMailForAddress: function(forAddress) {
    return chakram.get(`${root}/email`)
    .then(function(response) {
      return Promise.reduce(response.body, function(emails, email) {
        if (_.some(email.to, { address: forAddress})) {
          emails.push(email);
        }
        return emails;
      }, []);
    });
  },
  listen: function() {
    return new Promise(function(resolve, reject) {
      maildev.on('new', function(email) {
        return resolve(email);
      });
    });
  }
};
