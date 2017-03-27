var path = require('path');
var config = require(path.join(__dirname, 'config'));

var root = config.host;

var routes = module.exports = {
  auth: {
    register: {
      method: 'POST',
      path: `${root}/api/register`,
      data: {
        username: 'user',
        email: 'test@epochtalk.com',
        password: 'password',
        confirmation: 'password'
      }
    },
    login: {
      method: 'POST',
      path: `${root}/api/login`
    }
  },
  users: {
    delete: {
      method: 'DELETE',
      path: `${root}/api/users`
    },
    find: {
      method: 'GET',
      path: `${root}/api/users`
    }
  },
  boards: {
    allCategories: {
      method: 'GET',
      path: `${root}/api/boards`
    }
  }
};
