var path = require('path');
var chakram = require(path.join(__dirname, '..', 'chakram')), expect = chakram.expect;
var _ = require('lodash');

var mail = require(path.join(__dirname, '..', 'email'));
var get = mail.getMailForAddress;

describe("Mail Get", function() {
  var email = {
    address: 'test@epochtalk.com'
  };
  it("gets emails", function () {
    return get(email.address)
    .then(function(emails) {
      console.log(emails);
    });
  });
});
