var path = require('path');
var chakram = require(path.join(__dirname, '..', 'chakram')), expect = chakram.expect;

var methods = require(path.join(__dirname, '..', 'methods'));
var portal = methods.portal;

describe("Portal Contents (Disabled)", function() {
  it("doesn't get the portal when portal is disabled", function () {
    return portal.portal()
    .then(function(response) {
      expect(response).to.have.status(400);

      var body = response.body;
      expect(body).to.have.all.keys(['statusCode', 'error', 'message']);

      var statusCode = body.statusCode;
      expect(statusCode).to.equal(400);

      var message = body.message;
      expect(message).to.be.a.string('Portal Disabled');
    });
  });
});


// theCakeIsALie
