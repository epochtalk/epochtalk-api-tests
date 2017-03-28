var chakram = require('chakram');
var path = require('path');
var methods = require(path.join(__dirname, 'methods'));
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
    methods.auth.login(utils.admin.username, utils.admin.password)
    .then((response) => response.body.token),
    methods.users.find(username).then((response) => response.body.id)
  ];
  return chakram.all(pre)
  .spread(methods.users.delete);
};
