var Game = require('./index');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var expect = chai.expect;
chai.use(sinonChai);

describe('Game', function () {

  var game = null;

  var container = document.createElement('div');
  container.id = 'container';

  var canvas = document.createElement('canvas');
  canvas.id = 'game';
  container.appendChild(canvas);

  document.body.appendChild(container);

  describe('#initialize()', function () {
    beforeEach(function () {
      game = new Game('game');
    });

    it('should have requestAnimFrame', function () {
      game.initialize();

      expect(window.requestAnimFrame).to.exist;
    });

    it('Gameloop should be called', function () {
      sinon.spy(game, 'gameLoop');

      game.initialize();

      expect(game.gameLoop).to.have.been.called;
    });
  });

  describe('Game recognition', function () {

    beforeEach(function () {
      game = new Game('game');
      game.initialize();
    });

    it('should recognize a winning game', function () {
      var validGame = {
          "0-0": 7,
          "0-1": 1,
          "0-2": 4,
          "0-3": 8,
          "0-4": 6,
          "0-5": 3,
          "0-6": 5,
          "0-7": 9,
          "0-8": 2,
          "1-0": 2,
          "1-1": 5,
          "1-2": 8,
          "1-3": 4,
          "1-4": 1,
          "1-5": 9,
          "1-6": 3,
          "1-7": 6,
          "1-8": 7,
          "2-0": 6,
          "2-1": 9,
          "2-2": 3,
          "2-3": 2,
          "2-4": 7,
          "2-5": 5,
          "2-6": 8,
          "2-7": 1,
          "2-8": 4,
          "3-0": 1,
          "3-1": 7,
          "3-2": 5,
          "3-3": 3,
          "3-4": 9,
          "3-5": 6,
          "3-6": 2,
          "3-7": 4,
          "3-8": 8,
          "4-0": 8,
          "4-1": 6,
          "4-2": 2,
          "4-3": 7,
          "4-4": 4,
          "4-5": 1,
          "4-6": 9,
          "4-7": 3,
          "4-8": 5,
          "5-0": 4,
          "5-1": 3,
          "5-2": 9,
          "5-3": 5,
          "5-4": 2,
          "5-5": 8,
          "5-6": 6,
          "5-7": 7,
          "5-8": 1,
          "6-0": 3,
          "6-1": 8,
          "6-2": 6,
          "6-3": 1,
          "6-4": 5,
          "6-5": 7,
          "6-6": 4,
          "6-7": 2,
          "6-8": 9,
          "7-0": 9,
          "7-1": 4,
          "7-2": 1,
          "7-3": 6,
          "7-4": 8,
          "7-5": 2,
          "7-6": 7,
          "7-7": 5,
          "7-8": 3,
          "8-0": 5,
          "8-1": 2,
          "8-2": 7,
          "8-3": 9,
          "8-4": 3,
          "8-5": 4,
          "8-6": 1,
          "8-7": 8,
          "8-8": 6
      };

      game.loadGame(validGame);
      var gameResult = game.checkIfWon();
      expect(gameResult).to.equal(true);
    });

    it('should recognize a losing game due to missing numbers', function () {
      // Missing 0-0 value (null)
      var inValidGame = {
          "0-1": 1,
          "0-2": 4,
          "0-3": 8,
          "0-4": 6,
          "0-5": 3,
          "0-6": 5,
          "0-7": 9,
          "0-8": 2,
          "1-0": 2,
          "1-1": 5,
          "1-2": 8,
          "1-3": 4,
          "1-4": 1,
          "1-5": 9,
          "1-6": 3,
          "1-7": 6,
          "1-8": 7,
          "2-0": 6,
          "2-1": 9,
          "2-2": 3,
          "2-3": 2,
          "2-4": 7,
          "2-5": 5,
          "2-6": 8,
          "2-7": 1,
          "2-8": 4,
          "3-0": 1,
          "3-1": 7,
          "3-2": 5,
          "3-3": 3,
          "3-4": 9,
          "3-5": 6,
          "3-6": 2,
          "3-7": 4,
          "3-8": 8,
          "4-0": 8,
          "4-1": 6,
          "4-2": 2,
          "4-3": 7,
          "4-4": 4,
          "4-5": 1,
          "4-6": 9,
          "4-7": 3,
          "4-8": 5,
          "5-0": 4,
          "5-1": 3,
          "5-2": 9,
          "5-3": 5,
          "5-4": 2,
          "5-5": 8,
          "5-6": 6,
          "5-7": 7,
          "5-8": 1,
          "6-0": 3,
          "6-1": 8,
          "6-2": 6,
          "6-3": 1,
          "6-4": 5,
          "6-5": 7,
          "6-6": 4,
          "6-7": 2,
          "6-8": 9,
          "7-0": 9,
          "7-1": 4,
          "7-2": 1,
          "7-3": 6,
          "7-4": 8,
          "7-5": 2,
          "7-6": 7,
          "7-7": 5,
          "7-8": 3,
          "8-0": 5,
          "8-1": 2,
          "8-2": 7,
          "8-3": 9,
          "8-4": 3,
          "8-5": 4,
          "8-6": 1,
          "8-7": 8,
          "8-8": 6
      };

      game.loadGame(inValidGame);
      var gameResult = game.checkIfWon();
      expect(gameResult).to.equal(false);
    });

    it('should recognize a losing game when duplicate numbers in a row', function () {
      var inValidGame = {
          "0-0": 7,
          "0-1": 1,
          "0-2": 4,
          "0-3": 7,
          "0-4": 6,
          "0-5": 3,
          "0-6": 5,
          "0-7": 9,
          "0-8": 2,
          "1-0": 2,
          "1-1": 5,
          "1-2": 8,
          "1-3": 4,
          "1-4": 1,
          "1-5": 9,
          "1-6": 3,
          "1-7": 6,
          "1-8": 7,
          "2-0": 6,
          "2-1": 9,
          "2-2": 3,
          "2-3": 2,
          "2-4": 7,
          "2-5": 5,
          "2-6": 8,
          "2-7": 1,
          "2-8": 4,
          "3-0": 1,
          "3-1": 7,
          "3-2": 5,
          "3-3": 3,
          "3-4": 9,
          "3-5": 6,
          "3-6": 2,
          "3-7": 4,
          "3-8": 8,
          "4-0": 8,
          "4-1": 6,
          "4-2": 2,
          "4-3": 7,
          "4-4": 4,
          "4-5": 1,
          "4-6": 9,
          "4-7": 3,
          "4-8": 5,
          "5-0": 4,
          "5-1": 3,
          "5-2": 9,
          "5-3": 5,
          "5-4": 2,
          "5-5": 8,
          "5-6": 6,
          "5-7": 7,
          "5-8": 1,
          "6-0": 3,
          "6-1": 8,
          "6-2": 6,
          "6-3": 1,
          "6-4": 5,
          "6-5": 7,
          "6-6": 4,
          "6-7": 2,
          "6-8": 9,
          "7-0": 9,
          "7-1": 4,
          "7-2": 1,
          "7-3": 6,
          "7-4": 8,
          "7-5": 2,
          "7-6": 7,
          "7-7": 5,
          "7-8": 3,
          "8-0": 5,
          "8-1": 2,
          "8-2": 7,
          "8-3": 9,
          "8-4": 3,
          "8-5": 4,
          "8-6": 1,
          "8-7": 8,
          "8-8": 6
      };

      game.loadGame(inValidGame);
      var gameResult = game.checkIfWon();
      expect(gameResult).to.equal(false);
    });

    it('should recognize a losing game when duplicate numbers in a column', function () {
      var inValidGame = {
          "0-0": 7,
          "0-1": 1,
          "0-2": 4,
          "0-3": 8,
          "0-4": 6,
          "0-5": 3,
          "0-6": 5,
          "0-7": 9,
          "0-8": 2,
          "1-0": 2,
          "1-1": 5,
          "1-2": 8,
          "1-3": 4,
          "1-4": 1,
          "1-5": 9,
          "1-6": 3,
          "1-7": 6,
          "1-8": 7,
          "2-0": 6,
          "2-1": 9,
          "2-2": 3,
          "2-3": 2,
          "2-4": 7,
          "2-5": 5,
          "2-6": 8,
          "2-7": 1,
          "2-8": 4,
          "3-0": 1,
          "3-1": 7,
          "3-2": 5,
          "3-3": 3,
          "3-4": 9,
          "3-5": 6,
          "3-6": 2,
          "3-7": 4,
          "3-8": 8,
          "4-0": 8,
          "4-1": 1,
          "4-2": 2,
          "4-3": 7,
          "4-4": 4,
          "4-5": 1,
          "4-6": 9,
          "4-7": 3,
          "4-8": 5,
          "5-0": 4,
          "5-1": 3,
          "5-2": 9,
          "5-3": 5,
          "5-4": 2,
          "5-5": 8,
          "5-6": 6,
          "5-7": 7,
          "5-8": 1,
          "6-0": 3,
          "6-1": 8,
          "6-2": 6,
          "6-3": 1,
          "6-4": 5,
          "6-5": 7,
          "6-6": 4,
          "6-7": 2,
          "6-8": 9,
          "7-0": 9,
          "7-1": 4,
          "7-2": 1,
          "7-3": 6,
          "7-4": 8,
          "7-5": 2,
          "7-6": 7,
          "7-7": 5,
          "7-8": 3,
          "8-0": 5,
          "8-1": 2,
          "8-2": 7,
          "8-3": 9,
          "8-4": 3,
          "8-5": 4,
          "8-6": 1,
          "8-7": 8,
          "8-8": 6
      };

      game.loadGame(inValidGame);
      var gameResult = game.checkIfWon();
      expect(gameResult).to.equal(false);
    });
  });

  describe('#draw', function () {

    beforeEach(function () {
      game = new Game('game');
      game.initialize();
    });

    it('should call grid draw if game not won', function () {
      sinon.spy(game.state.grid, 'draw');

      game.draw(game.ctx);

      expect(game.state.grid.draw).to.have.been.called;
    });

    it('should call drawWinScreen if game won', function () {
      sinon.spy(game, 'drawWinScreen');
      sinon.stub(game, 'checkIfWon').returns(true);
      game.draw(game.ctx);

      expect(game.drawWinScreen).to.have.been.called;
    });
  });
});
