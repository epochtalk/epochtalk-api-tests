var path = require('path');
var utils = require(path.join(__dirname, '..', 'utils'));
var config = require(path.join(__dirname, '..', 'config'));
var chakram = require('chakram'), expect = chakram.expect;

var methods = require(path.join(__dirname, '..', 'methods'));
var auth = methods.auth;
var users = methods.users;

describe("User Delete", function() {
  var userInfo = {
    username: 'user',
    email: 'test@epochtalk.com',
    password: 'password',
    confirmation: 'password'
  };

  before("create the user to delete", function() {
    return auth.register(userInfo.username, userInfo.email, userInfo.password, userInfo.confirmation);
  });
  it("deletes a user", function () {
    // log in with admin account and get created user id
    var todo = [
      auth.login(utils.admin.username, utils.admin.password),
      users.find(userInfo.username)
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

      return users.delete(adminToken, userId);
    })
    .then(function(response) {
      expect(response).to.have.status(200);
      expect(response).to.have.property('body');

      var body = response.body;
      expect(response.body).to.have.all.keys(['username', 'email']);

      var username = body.username;
      expect(username).to.equal(userInfo.username);

      var email = body.email;
      expect(email).to.equal(userInfo.email);
    });
  });
});
