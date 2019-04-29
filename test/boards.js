var path = require('path');
var chakram = require(path.join(__dirname, '..', 'chakram')), expect = chakram.expect;

var utils = require(path.join(__dirname, '..', 'utils'));
var methods = require(path.join(__dirname, '..', 'methods'));
var boards = methods.boards;

// describe("[public] Boards", function() {
//   it("should return all boards", function () {
//     return boards.allCategories()
//     .then(function(response) {
//       var body = response.body;
//       // check the boards
//       expect(response).to.have.status(200);
//       expect(body).to.have.property('boards');
//       expect(body.boards).to.be.an.array;
//       expect(body.boards).to.have.length(4);
//       // check the threads
//       expect(body).to.have.property('threads');
//       expect(body.threads).to.be.an.array;
//       expect(body.threads).to.have.length(0);
//     });
//   });
// });

describe("Boards Creation", function() {
  var boardInfo = {
    name: 'Are you Board?',
    description: 'A board for bored people'
  };
  it("should create a board", function () {
    return utils.sudo().then(function(response) {
      var options = {
        adminToken: response.body.token,
        boards: [
          {
            name: boardInfo.name,
            description: boardInfo.description,
            viewable_by: boardInfo.viewable_by,
            postable_by: boardInfo.postable_by,
          }
        ]
      };
      return boards.create(options);
    })
    .then(function(response) {
      expect(response).to.have.status(200);

      var boards = response.body;
      expect(boards).to.have.length(1);

      var board = boards[0];
      expect(board).to.have.all.keys([
        'id',
        'name',
        'description',
        'right_to_left'
      ]);

      var id = board.id;
      expect(id).to.be.slugid;
      boardInfo.id = id;

      var name = board.name;
      expect(name).to.equal(boardInfo.name);

      var description = board.description;
      expect(description).to.equal(boardInfo.description);
    });
  });
  after("delete the created board", function() {
    return utils.sudo().then(function(response) {
      var options = {
        adminToken: response.body.token,
        boardIds: [
          boardInfo.id
        ]
      };
      return boards.delete(options);
    });
  });
});

describe("Boards Deletion", function() {
  var boardInfo = {
    name: 'Are you Board?',
    description: 'A board for bored people'
  };
  before("create the board to delete", function() {
    return utils.sudo().then(function(response) {
      var options = {
        adminToken: response.body.token,
        boards: [
          {
            name: boardInfo.name,
            description: boardInfo.description,
            viewable_by: boardInfo.viewable_by,
            postable_by: boardInfo.postable_by,
          }
        ]
      };
      return boards.create(options);
    })
    .then(function(response) {
      boardInfo.id = response.body[0].id;
    });
  });
  it("should delete a board", function () {
    return utils.sudo().then(function(response) {
      var options = {
        adminToken: response.body.token,
        boardIds: [
          boardInfo.id
        ]
      };
      return boards.delete(options);
    })
    .then(function(response) {
      expect(response).to.have.status(200);

      var boards = response.body;
      expect(boards).to.have.length(1);

      var board = boards[0];
      expect(board).to.have.all.keys(['id', 'name']);

      var id = board.id;
      expect(id).to.be.a.string;
      boardInfo.id = id;

      var name = board.name;
      expect(name).to.equal(boardInfo.name);
    });
  });
});
