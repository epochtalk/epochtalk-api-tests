var path = require('path');
var config = require(path.join(__dirname, '..', 'config'));
var chakram = require('chakram'), expect = chakram.expect;

var utils = require(path.join(__dirname, 'utils'));

var routes = {
  register: {
    method: 'POST',
    path: config.host + 'api/register',
    data: {
      username: 'user',
      email: 'test@epochtalk.com',
      password: 'password',
      confirmation: 'password'
    }
  },
  login: {
    method: 'POST',
    path: config.host + 'api/login'
  }
};

describe("Auth", function() {
  it("logs in a user", function() {
    return chakram.post(routes.login.path, utils.admin.credentials)
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
  it("register a user", function () {
    return chakram.post(routes.register.path, routes.register.data)
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
});