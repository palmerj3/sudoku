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
      mousedblclick : null,
      isWon: false,
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

  Game.prototype.loadGame = function (cells) {
    for (var c in cells) {
      if (!cells.hasOwnProperty(c)) continue;

      this.grid.state.cells[c].state.value = cells[c];
      this.grid.state.cells[c].state.valueUserEntered = false;
    }
  };

  Game.prototype.checkIfWon = function () {    
    // Check rows and cols for uniqueness
    for (var x = 0; x < 9; x++) {
      var rowUniq = [],
          colUniq = [];

      for (var y = 0; y < 9; y++) {
        var rowKey = x + '-' + y,
            colKey = y + '-' + x,
            rowVal = this.grid.state.cells[rowKey].state.value,
            colVal = this.grid.state.cells[colKey].state.value;

        if (rowUniq.indexOf(rowVal) > -1 || colUniq.indexOf(colVal) > -1) {
          return false;
        }

        rowUniq.push(rowVal);
        colUniq.push(colVal);
      }
    }

    // Check big blocks for uniqueness
    for (var s = 0; s < 3; s++) {
      var vals = [];

      for (var x = s*3; x < s*3+3; x++) {
        for (var y = s*3; y < s*3+3; y++) {
          var key = (x) + '-' + (y),
              val = this.grid.state.cells[key].state.value;

          if (val === null) {
            return false;
          } else {
            if (vals.indexOf(val) > -1) {
              return false;
            } else {
              vals.push(val);
            }
          }
        }
      }
    }

    return true;
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

    this.canvas.addEventListener('dblclick', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var rect = self.canvas.getBoundingClientRect();

      self.state.mousedblclick = {
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
    this.state.mousedblclick = null;
  };

  Game.prototype.draw = function (ctx) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.grid.draw(ctx);
  };

  module.exports = Game;

}());
