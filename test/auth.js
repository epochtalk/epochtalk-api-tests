var path = require('path');
var chakram = require('chakram'), expect = chakram.expect;

var utils = require(path.join(__dirname, '..', 'utils'));
var methods = require(path.join(__dirname, '..', 'methods'));
var auth = methods.auth;

describe("Auth Admin Login", function() {
  it("logs in as admin", function() {
    return auth.login(utils.admin.username, utils.admin.password)
    .then(function(response) {
      expect(response).to.have.status(200);

      var body = response.body;
      expect(body).to.have.property('token');
      expect(body).to.have.property('username');
      expect(body).to.have.property('id');

      var token = body.token;
      expect(token).to.be.a.string;

      var username = body.username;
      expect(username).to.be.equal('admin');

      var id = body.id;
      expect(id).to.be.a.string;
    });
  });
});

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
