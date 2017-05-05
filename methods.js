var path = require('path');
var chakram = require('chakram');
var queryString = require('query-string');
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
    logout: function(token) {
      var params = {
        headers: {
          'Authorization': `BEARER ${token}`
        }
      };
      return chakram.delete(`${root}/api/logout`, {}, params);
    },
    login: function(username, password) {
      return chakram.post(`${root}/api/login`, { username, password });
    }
  },
  admin: {
  },
  users: {
    invite: function(email, token) {
      var params = {
        headers: {
          'Authorization': `BEARER ${token}`
        }
      };
      return chakram.post(`${root}/api/invites`, { email }, params);
    },
    invitations: function(options, token) {
      var query = buildQuery(options);
      var params = {
        headers: {
          'Authorization': `BEARER ${token}`
        }
      };
      return chakram.get(`${root}/api/invites${query}`, params);
    },
    removeInvite: function(email, token) {
      var params = {
        headers: {
          'Authorization': `BEARER ${token}`
        }
      };
      return chakram.post(`${root}/api/invites/remove`, { email }, params);
    },
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
  },
  portal: {
    portal: function() {
      return chakram.get(`${root}/api/portal`);
    }
  }
};

function buildQuery(queryParams) {
  var query = queryString.stringify(queryParams);
  if (query) { query = `?${query}`; }
  return query;
}
