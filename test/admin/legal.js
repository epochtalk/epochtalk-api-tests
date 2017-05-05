var path = require('path');
var chakram = require(path.join(__dirname, '..', '..', 'chakram')), expect = chakram.expect;

var utils = require(path.join(__dirname, '..', '..', 'utils'));
var methods = require(path.join(__dirname, '..', '..', 'methods'));
var legal = methods.admin.legal;

describe("Legal page text", function() {
  it("should return text for the legal page", function () {
    return utils.sudo().then(function(response) {
      var adminToken = response.body.token;
      return legal.text(adminToken);
    })
    .then(function(response) {
      expect(response).to.have.status(200);

      var legalText = response.body;
      expect(legalText).to.have.all.keys(['tos', 'privacy', 'disclaimer']);

      var tos = legalText.tos;
      expect(tos).to.be.a('string');

      var privacy = legalText.privacy;
      expect(privacy).to.be.a('string');

      var disclaimer = legalText.disclaimer;
      expect(disclaimer).to.be.a('string');
    });
  });
});
