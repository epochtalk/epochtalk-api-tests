var path = require('path');
var chakram = require('chakram');
var routes = require(path.join(__dirname, 'routes'));

module.exports = {
  auth: {
    register: function(username, email, password, confirmation) {
      return chakram.post(`${routes.auth.register.path}`, { username, email, password, confirmation });
    },
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
  },
  boards: {
    allCategories: function() {
      return chakram.get(`${routes.boards.allCategories.path}`);
    }
  }
};
