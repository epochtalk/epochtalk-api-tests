var path = require('path');
var utils = require(path.join(__dirname, '..', 'utils'));
var config = require(path.join(__dirname, '..', 'config'));
var chakram = require('chakram'), expect = chakram.expect;

var routes = require(path.join(__dirname, '..', 'routes'));
var methods = require(path.join(__dirname, '..', 'methods'));
var auth = methods.auth;

describe("User Delete", function() {
  var userInfo = {
    username: 'user',
    email: 'test@epochtalk.com',
    password: 'password',
    confirmation: 'password'
  };

  // create the user to delete
  before(function() {
    return auth.register(userInfo.username, userInfo.email, userInfo.password, userInfo.confirmation);
  });
  it("deletes a user", function () {
    // log in with admin account and get created user id
    var todo = [
      chakram.post(routes.auth.login.path, utils.admin.credentials),
      chakram.get(`${routes.users.find.path}/${userInfo.username}`)
    ];
    return chakram.all(todo)
    .spread(function(adminResponse, userResponse) {
      expect(adminResponse).to.have.status(200);
      expect(adminResponse).to.have.property('body');
      expect(adminResponse.body).to.have.property('token');
      var adminToken = adminResponse.body.token;

      expect(userResponse).to.have.status(200);
      expect(userResponse).to.have.property('body');
      expect(userResponse.body).to.have.property('id');
      var userId = userResponse.body.id;

      var params = {
        headers: {
          'Authorization': `BEARER ${adminToken}`
        }
      };
      return chakram.delete(`${routes.users.delete.path}/${userId}`, {}, params);
    })
    .then(function(response) {
      expect(response).to.have.status(200);
      expect(response).to.have.property('body');

      var body = response.body;
      expect(response.body).to.have.property('username');
      expect(response.body).to.have.property('email');

      var username = body.username;
      expect(username).to.equal(userInfo.username);

      var email = body.email;
      expect(email).to.equal(userInfo.email);
    });
  });
});
