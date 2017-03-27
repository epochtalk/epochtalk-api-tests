var path = require('path');
var config = require(path.join(__dirname, 'config'));

var routes = module.exports = {
  auth: {
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
  },
  users: {
    deleteUser: {
      method: 'DELETE',
      path: config.host + 'api/users'
    },
    find: {
      method: 'GET',
      path: `${config.host}api/users`
    }
  }
};
