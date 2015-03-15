(function () {
  'use strict';

  var Util = require('../util');
  var Grid = require('../grid');

  var Game = function (canvasNodeId) {
    this.canvas = document.getElementById(canvasNodeId);
    this.ctx = this.canvas.getContext('2d');

    this.grid = new Grid();

    this.state = {
      mouseclick : null,
      canvasSize : {
        h: this.canvas.height,
        w: this.canvas.width
      }
    };

    // Re-bind so we can unbind and maintain function ref
    this.gameLoop = this.gameLoop.bind(this);
    this.tick = this.tick.bind(this);
    this.draw = this.draw.bind(this);
    this.listenForUserInput = this.listenForUserInput.bind(this);
  };

  Game.prototype.initialize = function () {
    Util.shim.rAF.install();

    this.listenForUserInput();
    this.listenForWindowResize();

    this.gameLoop();
  };

  Game.prototype.listenForWindowResize = function () {
    var self = this;

    window.addEventListener('resize', function (e) {
      self.state.canvasSize.h = window.innerWidth / 2;
      self.state.canvasSize.w = window.innerWidth / 2;

      self.canvas.width = self.state.canvasSize.w;
      self.canvas.height = self.state.canvasSize.h;
    });
  };

  Game.prototype.listenForUserInput = function () {
    var self = this;

    window.addEventListener('click', function (e) {
      e.preventDefault();

      var rect = self.canvas.getBoundingClientRect();

      self.state.mouseclick = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };

    });
  };

  Game.prototype.gameLoop = function () {
    requestAnimFrame(this.gameLoop);

    this.tick();
    this.draw(this.ctx);
  };

  Game.prototype.tick = function () {
    this.grid.tick(this.state);
  };

  Game.prototype.draw = function (ctx) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.grid.draw(ctx);
  };

  module.exports = Game;

}());
