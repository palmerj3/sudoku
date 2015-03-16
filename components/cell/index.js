(function () {
  'use strict';

  var Cell = function (position) {
    this.state = {
      position: position,
      scaledPosition: {
        x: null,
        y: null
      },
      scaledSize: null,
      value: null,
      annotations: [],
      showAnnotationsOverlay: false,
      highlighted: false
    };
  };

  Cell.prototype.updateBoundingBox = function (gameState) {
    var cellWidth = gameState.canvasSize.w / 9,
      cellHeight = gameState.canvasSize.h / 9;

    this.state.scaledSize = cellWidth;

    this.state.scaledPosition.x = Number(this.state.position.split('-')[0]) * cellWidth;
    this.state.scaledPosition.y = Number(this.state.position.split('-')[1]) * cellHeight;
  };

  Cell.prototype.updateHighlighting = function (gameState) {
    if (gameState.mouseclick !== null) {
      if (
        gameState.mouseclick.x >= this.state.scaledPosition.x &&
        gameState.mouseclick.y >= this.state.scaledPosition.y &&
        gameState.mouseclick.x <= (this.state.scaledPosition.x + this.state.scaledSize) &&
        gameState.mouseclick.y <= (this.state.scaledPosition.y + this.state.scaledSize)
      ) {
        this.state.highlighted = true;
        console.log('highlighted');
      }
    }
  };

  Cell.prototype.tick = function (gameState) {
    this.updateBoundingBox(gameState);
    this.updateHighlighting(gameState);
  };

  Cell.prototype.draw = function (ctx) {
    if (this.state.highlighted === true) {
      ctx.fillRect(
        this.state.scaledPosition.x,
        this.state.scaledPosition.y,
        this.state.scaledSize,
        this.state.scaledSize
      );
    }
  };

  module.exports = Cell;

}());
