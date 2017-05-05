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

describe("Legal page reset", function() {
  it("should reset text for the legal page", function () {
    return utils.sudo().then(function(response) {
      var adminToken = response.body.token;
      return legal.reset(adminToken);
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

describe("Legal page update", function() {
  var testText = {
    tos: 'The tos text should now contain this string.',
    privacy: 'The privacy text should now contain this string.',
    disclaimer: 'The disclaimer text should now contain this string.'
  };
  afterEach("reset legal text", function() {
    return utils.sudo().then(function(response) {
      var adminToken = response.body.token;
      return legal.reset(adminToken);
    })
  });
  it("should update tos for the legal page", function () {
    var adminToken;
    return utils.sudo().then(function(response) {
      adminToken = response.body.token;
      return legal.update({ tos: testText.tos }, adminToken);
    })
    .then(function(response) {
      expect(response).to.have.status(200);
      return legal.text(adminToken);
    })
    .then(function(response) {
      expect(response).to.have.status(200);

      var legalText = response.body;
      expect(legalText).to.have.all.keys(['tos', 'privacy', 'disclaimer']);

      var tos = legalText.tos;
      expect(tos).to.be.a('string')
      .and.to.equal(testText.tos);

      // returns the string 'undefined' for undefined fields
      var privacy = legalText.privacy;
      expect(privacy).to.equal('undefined');

      var disclaimer = legalText.disclaimer;
      expect(disclaimer).to.equal('undefined');
    });
  });
  it("should update privacy for the legal page", function () {
    var adminToken;
    return utils.sudo().then(function(response) {
      adminToken = response.body.token;
      return legal.update({ privacy: testText.privacy }, adminToken);
    })
    .then(function(response) {
      expect(response).to.have.status(200);
      return legal.text(adminToken);
    })
    .then(function(response) {
      expect(response).to.have.status(200);

      var legalText = response.body;
      expect(legalText).to.have.all.keys(['tos', 'privacy', 'disclaimer']);

      var privacy = legalText.privacy;
      expect(privacy).to.be.a('string')
      .and.to.equal(testText.privacy);

      // returns the string 'undefined' for undefined fields
      var tos = legalText.tos;
      expect(tos).to.equal('undefined');

      var disclaimer = legalText.disclaimer;
      expect(disclaimer).to.equal('undefined');
    });
  });
});
