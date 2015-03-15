var Game = require('./index');
var chai = require('chai');
var expect = chai.expect;

describe('Game', function () {

  var game = null;

  var container = document.createElement('div');
  container.id = 'container';

  var canvas = document.createElement('canvas');
  canvas.id = 'game';
  container.appendChild(canvas);

  document.body.appendChild(container);

  beforeEach(function () {
    game = new Game('game');
  });

  describe('#initialize()', function () {
    it('should have requestAnimFrame', function () {
      game.initialize();

      expect(window.requestAnimFrame).to.exist
    });
  });
});
