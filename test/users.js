var path = require('path');
var utils = require(path.join(__dirname, 'utils'));
var config = require(path.join(__dirname, '..', 'config'));
var chakram = require('chakram'), expect = chakram.expect;

var routes = require(path.join(__dirname, '..', 'routes'));

describe("User Delete", function() {
  // create the user to delete
  before(function() {
    return chakram.post(routes.auth.register.path, routes.auth.register.data)
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
      chakram.post(routes.auth.login.path, utils.admin.credentials),
      chakram.get(`${routes.users.find.path}/${routes.auth.register.data.username}`)
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
      expect(username).to.equal(routes.auth.register.data.username);

      var email = body.email;
      expect(email).to.equal(routes.auth.register.data.email);
    });
  });
});
