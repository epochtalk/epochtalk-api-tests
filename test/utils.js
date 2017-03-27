var chakram = require('chakram');
var path = require('path');
var config = require(path.join(__dirname, '..', 'config'));

var utils = module.exports = {
  admin: {
    username: 'admin',
    password: 'password',
    credentials: { username: 'admin', password: 'password' }
  }
};

utils.deleteUser = function(username) {
  var pre = [
    utilRoutes.getAdminLogin(),
    utilRoutes.findUser(username)
  ];
  return chakram.all(pre)
  .spread(utilRoutes.deleteUser);
};

var utilRoutes = {
  getAdminLogin: function() {
    return chakram.post(`${config.host}api/login`, utils.admin.credentials)
    .then(function(response) {
      return response.body.token;
    });
  },
  deleteUser: function(adminToken, userId) {
    console.log(adminToken, userId);
    var params = {
      headers: {
        'Authorization': `BEARER ${adminToken}`
      }
    };
    return chakram.delete(`${config.host}api/users/${userId}`, {}, params);
  },
  findUser: function(username) {
    return chakram.get(`${config.host}api/users/${username}`)
    .then(function(response) {
      return response.body.id;
    });
  }
};
