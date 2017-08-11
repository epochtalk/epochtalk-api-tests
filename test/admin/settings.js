var path = require('path');
var chakram = require(path.join(__dirname, '..', '..', 'chakram')), expect = chakram.expect;

var utils = require(path.join(__dirname, '..', '..', 'utils'));
var methods = require(path.join(__dirname, '..', '..', 'methods'));
var settings = methods.admin.settings;

describe("Settings find", function() {
  it("should return the settings", function () {
    return utils.sudo().then(function(response) {
      var adminToken = response.body.token;
      return settings.find(adminToken);
    })
    .then(function(response) {
      expect(response).to.have.status(200);

      var settings = response.body;
      expect(settings).to.have.all.keys([
        'emailer',
        'ga_key',
        'images',
        'invite_only',
        'log_enabled',
        'login_required',
        'portal',
        'rate_limiting',
        'verify_registration',
        'website'
      ]);
    });
  });
});
