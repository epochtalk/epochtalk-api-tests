var path = require('path');
var Promise = require('bluebird');
var utils = require(path.join(__dirname, '..', 'utils'));
var config = require(path.join(__dirname, '..', 'config'));
var chakram = require(path.join(__dirname, '..', 'chakram')), expect = chakram.expect;

var methods = require(path.join(__dirname, '..', 'methods'));
var auth = methods.auth;
var users = methods.users;
var email = require(path.join(__dirname, '..', 'email'));

describe("User Invite", function() {
  var userInfo = {
    username: 'user',
    email: 'test@epochtalk.com',
    password: 'password',
    confirmation: 'password'
  };

  it("Sends an email invitation", function() {
    return utils.sudo().then(function(response) {
      var adminToken = response.body.token;
      return Promise.join(email.listen(), users.invite(userInfo.email, adminToken));
    })
    .spread(function(email, response) {
      // check response
      expect(response).to.have.status(200);
      expect(response).to.have.property('body');

      var body = response.body;
      expect(response.body).to.have.all.keys([
        'message',
        'confirm_token'
      ]);
    });
  });
  after("remove invite", function() {
    return utils.sudo().then(function(response) {
      var adminToken = response.body.token;
      return users.removeInvite(userInfo.email, adminToken);
    });
  });
});

describe("User Find", function() {
  var userInfo = {
    username: 'user',
    email: 'test@epochtalk.com',
    password: 'password',
    confirmation: 'password'
  };

  before("create the user to find", function() {
    return auth.register(userInfo.username, userInfo.email, userInfo.password, userInfo.confirmation)
    .then(function(response) {
      // save the user id for cleanup
      userInfo.id = response.body.id;
    });
  });
  it("finds a user", function () {
    return users.find(userInfo.username)
    .then(function(response) {
      expect(response).to.have.status(200);
      expect(response).to.have.property('body');

      var body = response.body;
      expect(response.body).to.have.all.keys([
        'activity',
        'avatar',
        'created_at',
        'id',
        'malicious_score',
        'priority',
        'roles',
        'updated_at',
        'username'
      ]);

      var userId = body.id;
      expect(userId).to.be.a.slugid;
    });
  });
  it("doesn't find a nonexistant user", function () {
    return users.find('invalidusername')
    .then(function(response) {
      expect(response).to.have.status(404);
      expect(response).to.have.property('body');

      var body = response.body;
      expect(response.body).to.have.all.keys(['error', 'statusCode']);

      expect(body.statusCode).to.equal(404);
      expect(body.error).to.equal('Not Found');
    });
  });
  it("doesn't find a crazy user", function () {
    return users.find('j!@#$%^&*()_=[][}{`~')
    .then(function(response) {
      expect(response).to.have.status(404);
      expect(response).to.have.property('body');

      var body = response.body;
      expect(response.body).to.have.all.keys(['error', 'statusCode']);

      expect(body.statusCode).to.equal(404);
      expect(body.error).to.equal('Not Found');
    });
  });
  after("delete the created user", function() {
    return utils.sudo().then(function(response) {
      var adminToken = response.body.token;
      return users.delete(adminToken, userInfo.id);
    })
  });
});

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
  it("doesn't find a deleted user", function () {
    return users.find(userInfo.username)
    .then(function(response) {
      expect(response).to.have.status(404);
      expect(response).to.have.property('body');

      var body = response.body;
      expect(response.body).to.have.all.keys(['error', 'statusCode']);

      expect(body.statusCode).to.equal(404);
      expect(body.error).to.equal('Not Found');
    });
  });
});
