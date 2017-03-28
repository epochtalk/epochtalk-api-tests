var path = require('path');
var chakram = require('chakram'), expect = chakram.expect;

var utils = require(path.join(__dirname, '..', 'utils'));
var methods = require(path.join(__dirname, '..', 'methods'));
var auth = methods.auth;

describe("Auth Registration", function() {
  var userInfo = {
    username: 'user',
    email: 'test@epochtalk.com',
    password: 'password',
    confirmation: 'password'
  };

  it("registers a user", function () {
    return auth.register(userInfo.username, userInfo.email, userInfo.password, userInfo.confirmation)
    .then(function(response) {
      expect(response).to.have.status(200);

      var body = response.body;
      expect(body).to.have.property('token');
      expect(body).to.have.property('id');
      expect(body).to.have.property('avatar');
      expect(body).to.have.property('roles');

      var token = body.token;
      expect(token).to.be.a.string;

      var id = body.id;
      expect(id).to.be.a.string;

      var avatar = body.avatar;
      expect(avatar).to.be.a.string;

      var roles = body.roles;
      expect(avatar).to.be.an.array;
    });
  });
  after("delete created user", function() {
    return utils.deleteUser(userInfo.username);
  });
});

describe("Auth Login", function() {
  var userInfo = {
    username: 'user',
    email: 'test@epochtalk.com',
    password: 'password',
    confirmation: 'password'
  };

  before("register a user", function() {
    return auth.register(userInfo.username, userInfo.email, userInfo.password, userInfo.confirmation);
  });
  it("logs in", function() {
    return auth.login(userInfo.username, userInfo.password)
    .then(function(response) {
      expect(response).to.have.status(200);

      var body = response.body;
      expect(body).to.have.property('token');
      expect(body).to.have.property('username');
      expect(body).to.have.property('id');

      var token = body.token;
      expect(token).to.be.a.string;

      var username = body.username;
      expect(username).to.be.equal(userInfo.username);

      var id = body.id;
      expect(id).to.be.a.string;
    });
  });
  after("delete created user", function() {
    return utils.deleteUser(userInfo.username);
  });
});

describe("Auth Username Availability", function() {
  var userInfo = {
    username: 'user',
    email: 'test@epochtalk.com',
    password: 'password',
    confirmation: 'password'
  };

  before("register a user", function() {
    return auth.register(userInfo.username, userInfo.email, userInfo.password, userInfo.confirmation);
  });
  it("checks if a username is available", function () {
    return auth.checkUsernameAvailability('otherusername')
    .then(function(response) {
      expect(response).to.have.status(200);

      var body = response.body;
      expect(body).to.have.property('found');

      var found = response.body.found;
      expect(found).to.be.false;
    });
  });
  it("checks if a username is unavailable", function () {
    return auth.checkUsernameAvailability(userInfo.username)
    .then(function(response) {
      expect(response).to.have.status(200);

      var body = response.body;
      expect(body).to.have.property('found');

      var found = response.body.found;
      expect(found).to.be.true;
    });
  });
  after("delete created user", function() {
    return utils.deleteUser(userInfo.username);
  });
});
