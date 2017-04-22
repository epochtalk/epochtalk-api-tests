var path = require('path');
var Promise = require('bluebird');
var _ = require('lodash');
var chakram = require('chakram');
var config = require(path.join(__dirname, 'config'));
var root = config.emailerHost;

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
  }
};
