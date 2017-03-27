var chakram = require('chakram');
var path = require('path');
var routes = require(path.join(__dirname, '..', 'routes'));
var methods = require(path.join(__dirname, '..', 'methods'));
var users = methods.users;

var utils = module.exports = {
  admin: {
    username: 'admin',
    password: 'password',
    credentials: { username: 'admin', password: 'password' }
  }
};

utils.deleteUser = function(username) {
  var pre = [
    methods.auth.login(utils.admin.username, utils.admin.password),
    methods.users.find(username)
  ];
  return chakram.all(pre)
  .spread(methods.users.delete);
};
