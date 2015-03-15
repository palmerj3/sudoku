(function() {
  'use strict';

  var Grid = function() {
    this.state = {
      highlights : {}
    }
  };

  Grid.prototype.handleMouseClick = function (gamestate) {
    var cellWidth = gamestate.canvasSize.w / 9,
        cellHeight = gamestate.canvasSize.h / 9,
        cellX = Math.floor(gamestate.mouseclick.x/cellWidth)*cellWidth,
        cellY = Math.floor(gamestate.mouseclick.y/cellHeight)*cellHeight,
        key = Math.floor(cellX/cellWidth) + '-' + Math.floor(cellY/cellHeight);

    console.log('Canvas Dimensions (', gamestate.canvasSize.w, 'x' , gamestate.canvasSize.h, ')');
    console.log('Cell Dimensions(', cellWidth, 'x' , cellHeight, ')');
    console.log('Cell Coords (', cellX, ',' , cellY, ')');
    console.log('Click Coords (', gamestate.mouseclick.x, ',' , gamestate.mouseclick.y, ')');
    console.log('Key', key);

    if (!this.state.highlights.hasOwnProperty(key)) {
      this.state.highlights[key] = 'selected';
    } else {
      delete(this.state.highlights[key]);
    }

    gamestate.mouseclick = null;
  };

  Grid.prototype.drawGrid = function (ctx) {
    var width = ctx.canvas.width,
        height = ctx.canvas.height,
        lineWidth = width / 9,
        lineHeight = height / 9;


    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, width, height);

    for (var x=1; x < 9; x++) {
      ctx.beginPath();

      ctx.moveTo(x * lineWidth, 0);
      ctx.lineTo(x * lineWidth, height);

      if (x % 3 === 0) {
        ctx.lineWidth = 5;
      } else {
        ctx.lineWidth = 1;
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

  Grid.prototype.drawHighlights = function (ctx) {
    var cellWidth = ctx.canvas.width / 9,
        cellHeight = ctx.canvas.height / 9;

    for (var h in this.state.highlights) {
      if (!this.state.highlights.hasOwnProperty(h)) continue;

      var h_x = Number(h.split('-')[0]),
          h_y = Number(h.split('-')[1]),
          cellX = h_x*cellWidth,
          cellY = h_y*cellHeight;

      //console.log('Highlight: (', cellX, ',', cellY, ')');

      ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
    }
  };

  Grid.prototype.tick = function (gameState) {
    if (gameState.mouseclick !== null) {
      this.handleMouseClick(gameState);
    }
  };

  Grid.prototype.draw = function (ctx) {
    this.drawGrid(ctx);
    this.drawHighlights(ctx);
  };

  module.exports = Grid;

}());
