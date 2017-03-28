var path = require('path');
var chakram = require('chakram'), expect = chakram.expect;

var methods = require(path.join(__dirname, '..', 'methods'));
var boards = methods.boards;

describe("[public] Boards", function() {
  it("should return all boards", function () {
    return boards.allCategories()
    .then(function(response) {
      var body = response.body;
      // check the boards
      expect(response).to.have.status(200);
      expect(body).to.have.property('boards');
      expect(body.boards).to.be.an.array;
      expect(body.boards).to.have.length(4);
      // check the threads
      expect(body).to.have.property('threads');
      expect(body.threads).to.be.an.array;
      expect(body.threads).to.have.length(0);
    });
  });
});
