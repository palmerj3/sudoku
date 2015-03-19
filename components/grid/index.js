(function() {
  'use strict';

  var Cell = require('../cell');

  var Grid = function() {
    this.config = {
      boxWidth: 5,
      gridWidth: 1,
      gridColor: '#000000'
    };

    this.state = {
      highlights : {},
      cells: this.initializeCells()
    }
  };

  Grid.prototype.initializeCells = function () {
    var cellHash = {};

    for (var x=0; x < 9; x++) {
      for (var y=0; y < 9; y++) {
        var key = x + '-' + y;

        cellHash[key] = new Cell(key);
      }
    }

    return cellHash;
  };

  Grid.prototype.drawGrid = function (ctx) {
    var width = ctx.canvas.width,
        height = ctx.canvas.height,
        lineWidth = width / 9,
        lineHeight = height / 9;

    ctx.lineWidth = this.config.boxWidth;
    ctx.strokeRect(0, 0, width, height);

    for (var x=1; x < 9; x++) {
      ctx.beginPath();

      ctx.moveTo(x * lineWidth, 0);
      ctx.lineTo(x * lineWidth, height);

      if (x % 3 === 0) {
        ctx.lineWidth = this.config.boxWidth;
      } else {
        ctx.lineWidth = this.config.gridWidth;
      }

      ctx.stroke();
    }

    for (var y=1; y < 9; y++) {
      ctx.beginPath();

      ctx.moveTo(0, y * lineHeight);
      ctx.lineTo(width, y * lineHeight);

      if (y % 3 === 0) {
        ctx.lineWidth = 5;
      } else {
        ctx.lineWidth = 1;
      }

      ctx.stroke();
    }
  };

  Grid.prototype.tick = function (gameState) {
    for (var c in this.state.cells) {
      if (!this.state.cells.hasOwnProperty(c)) continue;

      this.state.cells[c].tick(gameState);
    }
  };

  Grid.prototype.draw = function (ctx) {
    this.drawGrid(ctx);

    for (var c in this.state.cells) {
      if (!this.state.cells.hasOwnProperty(c)) continue;

      this.state.cells[c].draw(ctx);
    }
  };

  module.exports = Grid;

}());
