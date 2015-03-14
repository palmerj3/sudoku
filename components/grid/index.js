(function() {
  'use strict';

  var Grid = function() {

  };

  Grid.prototype.tick = function () {

  };

  Grid.prototype.draw = function (ctx) {
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

  module.exports = Grid;

}());
