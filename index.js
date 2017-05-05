var path = require('path');
var test = require(path.join(__dirname, 'test'));

require(test.admin);
require(test.auth);
require(test.users);
require(test.boards);
require(test.portal);
