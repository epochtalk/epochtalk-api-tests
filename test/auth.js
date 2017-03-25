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

var utilityRoutes = {
  deleteUser: {
    method: 'DELETE',
    path: config.host + 'api/users'
  },
  findTestUser: {
    method: 'GET',
    path: `${config.host}api/users/user`
  }
};

describe("Auth Admin Login", function() {
  it("logs in as admin", function() {
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
});

describe("Auth Registration", function() {
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
  it("deletes a user", function () {
    // log in with admin account and get created user id
    var todo = [
      chakram.post(routes.login.path, utils.admin.credentials),
      chakram.get(utilityRoutes.findTestUser.path)
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
      return chakram.delete(`${utilityRoutes.deleteUser.path}/${userId}`, {}, params);
    })
    .then(function(response) {
      expect(response).to.have.status(200);
      expect(response).to.have.property('body');

      var body = response.body;
      expect(response.body).to.have.property('username');
      expect(response.body).to.have.property('email');

      var username = body.username;
      expect(username).to.equal(routes.register.data.username);

      var email = body.email;
      expect(email).to.equal(routes.register.data.email);
    });
  });
});
