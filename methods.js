var path = require('path');
var chakram = require('chakram');
var config = require(path.join(__dirname, 'config'));
var root = config.host;

module.exports = {
  auth: {
    register: function(username, email, password, confirmation) {
      return chakram.post(`${root}/api/register`, { username, email, password, confirmation });
    },
    authenticate: function(token) {
      var params = {
        headers: {
          'Authorization': `BEARER ${token}`
        }
      };
      return chakram.get(`${root}/api/authenticate`, params);
    },
    checkUsernameAvailability: function(username) {
      return chakram.get(`${root}/api/register/username/${username}`);
    },
    checkEmailAvailability: function(email) {
      return chakram.get(`${root}/api/register/email/${email}`);
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
    create: function(options) {
      var data = options.boards;
      var params = {};
      if (options.adminToken) {
        params.headers = {
          'Authorization': `BEARER ${options.adminToken}`
        };
      }
      return chakram.post(`${root}/api/boards`, data, params);
    },
    delete: function(options) {
      var data = options.boards;
      var params = {};
      if (options.adminToken) {
        params.headers = {
          'Authorization': `BEARER ${options.adminToken}`
        };
      }
      return chakram.post(`${root}/api/boards/delete`, data, params);
    },
    allCategories: function() {
      return chakram.get(`${root}/api/boards`);
    }
  }
};
