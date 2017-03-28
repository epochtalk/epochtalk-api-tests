var path = require('path');
var chakram = require('chakram');
var config = require(path.join(__dirname, 'config'));
var root = config.host;

module.exports = {
  auth: {
    register: function(username, email, password, confirmation) {
      return chakram.post(`${root}/api/register`, { username, email, password, confirmation });
    },
    checkUsernameAvailability: function(username) {
      return chakram.get(`${root}/api/register/username/${username}`);
    },
    login: function(username, password) {
      return chakram.post(`${root}/api/login`, { username, password });
    }
  },
  users: {
    delete: function(adminToken, userId) {
      var params = {
        headers: {
          'Authorization': `BEARER ${adminToken}`
        }
      };
      return chakram.delete(`${root}/api/users/${userId}`, {}, params);
    },
    find: function(username) {
      return chakram.get(`${root}/api/users/${username}`);
    }
  },
  boards: {
    allCategories: function() {
      return chakram.get(`${root}/api/boards`);
    }
  }
};
