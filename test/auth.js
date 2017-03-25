var path = require('path');
var config = require(path.join(__dirname, '..', 'config'));
var chakram = require('chakram'), expect = chakram.expect;

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
  }
};

describe("Auth", function() {
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
