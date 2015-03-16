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
      mouseposition : null,
      canvasSize : {
        h: window.innerWidth / 2,
        w: window.innerWidth / 2
      }
    };

    this.updateCanvasSize();

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

  Game.prototype.updateCanvasSize = function () {
    this.canvas.width = this.state.canvasSize.w;
    this.canvas.height = this.state.canvasSize.h;
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

    this.canvas.addEventListener('mousemove', function (e) {
      var rect = self.canvas.getBoundingClientRect();

      self.state.mouseposition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }, false);

    this.canvas.addEventListener('click', function (e) {
      e.preventDefault();

      var rect = self.canvas.getBoundingClientRect();

      self.state.mouseclick = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }, false);

    this.canvas.addEventListener('touchstart', function (e) {
      e.preventDefault();

      var rect = self.canvas.getBoundingClientRect();

      self.state.mouseclick = {
        x: e.targetTouches[0].pageX - rect.left,
        y: e.targetTouches[0].pageY - rect.top
      };
    }, false);
  };

  Game.prototype.gameLoop = function () {
    requestAnimFrame(this.gameLoop);

    this.tick();
    this.draw(this.ctx);
  };

  Game.prototype.tick = function () {
    this.grid.tick(this.state);

    this.state.mouseclick = null;
    //this.state.mouseposition = null;
  };

  Game.prototype.draw = function (ctx) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.grid.draw(ctx);
  };

  module.exports = Game;

}());
