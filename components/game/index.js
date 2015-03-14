(function () {
  'use strict';

  var Util = require('../util/');
  Util.shim.rAF.install();

  var Game = function (canvasNodeId) {
    this.canvas = document.getElementById(canvasNodeId);
    this.ctx = this.canvas.getContext('2d');

    // Re-bind
    this.run = this.run.bind(this);
    this.tick = this.tick.bind(this);
    this.draw = this.draw.bind(this);
  };

  Game.prototype.initialize = function () {
    this.run();
  };

  Game.prototype.run = function () {
    requestAnimFrame(this.run);

    this.tick();
    this.draw(this.ctx);
  };

  Game.prototype.tick = function () {
    console.log('Tick');
  };

  Game.prototype.draw = function (ctx) {
    console.log('Draw');
  };

  module.exports = Game;

}());
