var path = require('path');
var chakram = require('chakram');
var routes = require(path.join(__dirname, 'routes'));

module.exports = {
  auth: {
    login: function(username, password) {
      return chakram.post(`${routes.auth.login.path}`, { username, password });
    }
  },
  users: {
    delete: function(adminToken, userId) {
      var params = {
        headers: {
          'Authorization': `BEARER ${adminToken}`
        }
      };
      return chakram.delete(`${routes.users.delete.path}/${userId}`, {}, params);
    },
    find: function(username) {
      return chakram.get(`${routes.users.find.path}/${username}`);
    }
  }
};
