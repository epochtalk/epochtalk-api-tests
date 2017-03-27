var path = require('path');
var test = require(path.join(__dirname, 'test'));

require(test.auth);
require(test.users);
require(test.boards);
