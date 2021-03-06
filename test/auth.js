var path = require('path');
var chakram = require(path.join(__dirname, '..', 'chakram')), expect = chakram.expect;

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
      expect(body).to.have.all.keys(['token', 'id', 'avatar', 'roles', 'permissions', 'username']);

      var token = body.token;
      expect(token).to.be.a.string;

      var id = body.id;
      expect(id).to.be.a.slugid;

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
      expect(body).to.have.all.keys([
        'token',
        'username',
        'id',
        'avatar',
        'moderating',
        'permissions',
        'roles',
        'malicious_score'
      ]);

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

describe("Auth Logout", function() {
  var userInfo = {
    username: 'user',
    email: 'test@epochtalk.com',
    password: 'password',
    confirmation: 'password'
  };

  before("register a user", function() {
    return auth.register(userInfo.username, userInfo.email, userInfo.password, userInfo.confirmation)
    .then(function() {
      return auth.login(userInfo.username, userInfo.password);
    })
    .then(function(response) {
      userInfo.token = response.body.token;
    });
  });
  it("logs out", function() {
    return auth.logout(userInfo.token)
    .then(function(response) {
      expect(response).to.have.status(200);
    });
  });
  it("doesn't log out again", function() {
    return auth.logout(userInfo.token)
    .then(function(response) {
      expect(response).to.have.status(401);
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
      expect(body).to.have.all.keys(['found']);

      var found = response.body.found;
      expect(found).to.be.false;
    });
  });
  it("checks if a username is unavailable", function () {
    return auth.checkUsernameAvailability(userInfo.username)
    .then(function(response) {
      expect(response).to.have.status(200);

      var body = response.body;
      expect(body).to.have.all.keys(['found']);

      var found = response.body.found;
      expect(found).to.be.true;
    });
  });
  after("delete created user", function() {
    return utils.deleteUser(userInfo.username);
  });
});

describe("Auth Email Availability", function() {
  var userInfo = {
    username: 'user',
    email: 'test@epochtalk.com',
    password: 'password',
    confirmation: 'password'
  };

  before("register a user", function() {
    return auth.register(userInfo.username, userInfo.email, userInfo.password, userInfo.confirmation);
  });
  it("checks if an email is available", function () {
    return auth.checkEmailAvailability('othertest@epochtalk.com')
    .then(function(response) {
      expect(response).to.have.status(200);

      var body = response.body;
      expect(body).to.have.all.keys(['found']);

      var found = response.body.found;
      expect(found).to.be.false;
    });
  });
  it("checks if an email is unavailable", function () {
    return auth.checkEmailAvailability(userInfo.email)
    .then(function(response) {
      expect(response).to.have.status(200);

      var body = response.body;
      expect(body).to.have.all.keys(['found']);

      var found = response.body.found;
      expect(found).to.be.true;
    });
  });
  after("delete created user", function() {
    return utils.deleteUser(userInfo.username);
  });
});

describe("Auth Authenticate", function() {
  var userInfo = {
    username: 'user',
    email: 'test@epochtalk.com',
    password: 'password',
    confirmation: 'password'
  };

  before("register a user", function() {
    return auth.register(userInfo.username, userInfo.email, userInfo.password, userInfo.confirmation);
  });
  it("checks a user's authentication after login", function() {
    return auth.login(userInfo.username, userInfo.password)
    .then(function(response) {
      userInfo.token = response.body.token;
    })
    .then(function() {
      return auth.authenticate(userInfo.token);
    })
    .then(function(response) {
      expect(response).to.have.status(200);

      var body = response.body;
      expect(body).to.have.all.keys([
        'id',
        'username',
        'avatar',
        'roles',
        'moderating',
        'permissions',
        'token'
      ]);

      var id = response.body.id;
      expect(id).to.be.a.slugid;

      var username = response.body.username;
      expect(username).to.be.a('string');

      var avatar = response.body.avatar;
      expect(avatar).to.be.a('string');

      var roles = response.body.roles;
      expect(roles).to.be.an('array');

      var moderating = response.body.moderating;
      expect(moderating).to.be.an('array');

      var permissions = response.body.permissions;

      var token = response.body.token;
      expect(token).to.be.a('string');
    });
  });
  it("checks a user's authentication after logout", function() {
    return auth.logout(userInfo.token)
    .then(function() {
      return auth.authenticate(userInfo.token);
    })
    .then(function(response) {
      expect(response).to.have.status(401);
    });
  });
  after("delete created user", function() {
    return utils.deleteUser(userInfo.username);
  });
});
