(function () {
  'use strict';

  var Util = require('../util/');
  var Grid = require('../grid');

  var Game = function (canvasNodeId) {
    this.canvas = document.getElementById(canvasNodeId);
    this.ctx = this.canvas.getContext('2d');

    this.grid = new Grid();

    // Re-bind
    this.run = this.run.bind(this);
    this.tick = this.tick.bind(this);
    this.draw = this.draw.bind(this);
  };

  Game.prototype.initialize = function () {
    Util.shim.rAF.install();

    this.run();
  };

  Game.prototype.run = function () {
    requestAnimFrame(this.run);

    this.tick();
    this.draw(this.ctx);
  };

  Game.prototype.tick = function () {
    this.grid.tick();
  };

  Game.prototype.draw = function (ctx) {
    this.grid.draw(ctx);
  };

  module.exports = Game;

}());
