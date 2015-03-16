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
      annotationHighlighted: null,
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
      } else {
        this.state.highlighted = false;
      }
    }
  };

  Cell.prototype.updateAnnotationsOverlayState = function (gameState) {
    this.state.showAnnotationsOverlay = false;

    if (gameState.mouseposition !== null && this.state.value === null) {
      if (
        gameState.mouseposition.x >= this.state.scaledPosition.x &&
        gameState.mouseposition.y >= this.state.scaledPosition.y &&
        gameState.mouseposition.x <= (this.state.scaledPosition.x + this.state.scaledSize) &&
        gameState.mouseposition.y <= (this.state.scaledPosition.y + this.state.scaledSize)
      ) {
        this.state.showAnnotationsOverlay = true;

        // Note if any overlay text is hovered over
        var annotationRow = Math.floor(
          (gameState.mouseposition.y - this.state.scaledPosition.y) / 
          (this.state.scaledSize / 3));
        var annotationCol = Math.floor((
          gameState.mouseposition.x - this.state.scaledPosition.x) / 
          (this.state.scaledSize / 3));

        this.state.annotationHighlighted = annotationCol + (annotationRow * 3);
      }
    }
  };

  Cell.prototype.updateCellClickState = function (gameState) {
    if (gameState.mouseclick !== null) {
      if (
        gameState.mouseclick.x >= this.state.scaledPosition.x &&
        gameState.mouseclick.y >= this.state.scaledPosition.y &&
        gameState.mouseclick.x <= (this.state.scaledPosition.x + this.state.scaledSize) &&
        gameState.mouseclick.y <= (this.state.scaledPosition.y + this.state.scaledSize)
      ) {

        // Note if any overlay text is hovered over
        var annotationRow = Math.floor(
          (gameState.mouseclick.y - this.state.scaledPosition.y) / 
          (this.state.scaledSize / 3));
        var annotationCol = Math.floor((
          gameState.mouseclick.x - this.state.scaledPosition.x) / 
          (this.state.scaledSize / 3));

        var annotationSelected = annotationCol + (annotationRow * 3);

        if (this.state.annotations.indexOf(annotationSelected) > -1) {
          this.state.annotations.splice(
            this.state.annotations.indexOf(annotationSelected),
            1
          );
        } else {
          this.state.annotations.push(annotationSelected);
        }
      }
    }
  };

  Cell.prototype.updateCellDblClickState = function (gameState) {
    if (gameState.mousedblclick !== null) {
      if (
        gameState.mousedblclick.x >= this.state.scaledPosition.x &&
        gameState.mousedblclick.y >= this.state.scaledPosition.y &&
        gameState.mousedblclick.x <= (this.state.scaledPosition.x + this.state.scaledSize) &&
        gameState.mousedblclick.y <= (this.state.scaledPosition.y + this.state.scaledSize)
      ) {

        if (this.state.value === null) {
          // Note if any overlay text is hovered over
          var annotationRow = Math.floor(
            (gameState.mousedblclick.y - this.state.scaledPosition.y) / 
            (this.state.scaledSize / 3));
          var annotationCol = Math.floor((
            gameState.mousedblclick.x - this.state.scaledPosition.x) / 
            (this.state.scaledSize / 3));

          var annotationSelected = annotationCol + (annotationRow * 3);

          // Clear annotations
          this.state.annotations = [];
          this.state.showAnnotationsOverlay = false;

          console.log('Setting value to: ', annotationSelected);

          // Set value for cell
          this.state.value = annotationSelected+1;
        } else {
          this.state.value = null;
        }
      }
    }
  };

  Cell.prototype.drawAnnotationSelector = function (ctx) {
    var annotationSelectionWidth = this.state.scaledSize / 3,
        heightOffset = 0,
        nudgeOffset = this.state.scaledSize * 0.06,
        scaledFontSize = this.state.scaledSize * 0.3;

    if (this.state.showAnnotationsOverlay === true) {
      for (var i=0; i < 9; i++) {
        if (i % 3 === 0) {
          heightOffset++;
        }

        ctx.font = scaledFontSize + "px serif";
        
        if (this.state.annotationHighlighted === i) {
          ctx.fillStyle = '#ff0000';
        } else {
          ctx.fillStyle = '#cccccc';
        }
        
        ctx.fillText(
          i+1,
          nudgeOffset+this.state.scaledPosition.x + (i % 3) * annotationSelectionWidth,
          (nudgeOffset*-1)+this.state.scaledPosition.y + (heightOffset) * annotationSelectionWidth
        );
      }
    }
  };

  Cell.prototype.drawAnnotations = function (ctx) {
    var annotationSelectionWidth = this.state.scaledSize / 3,
        heightOffset = 0,
        nudgeOffset = this.state.scaledSize * 0.06,
        scaledFontSize = this.state.scaledSize * 0.3;

    for (var i=0; i < 9; i++) {
      if (i % 3 === 0) {
        heightOffset++;
      }

      ctx.font = scaledFontSize + "px serif";
      ctx.fillStyle = '#ff0000';
      
      if (this.state.annotations.indexOf(i) > -1) {
        ctx.fillText(
          i+1,
          nudgeOffset+this.state.scaledPosition.x + (i % 3) * annotationSelectionWidth,
          (nudgeOffset*-1)+this.state.scaledPosition.y + (heightOffset) * annotationSelectionWidth
        );
      }
    }
  };

  Cell.prototype.drawValue = function (ctx) {
    if (this.state.value !== null) {
      ctx.font = this.state.scaledSize * 0.6 + "px serif";
      ctx.fillStyle = '#ff0000';

      ctx.fillText(
        this.state.value,
        this.state.scaledPosition.x + (this.state.scaledSize * 0.6 / 2),
        this.state.scaledPosition.y + (this.state.scaledSize * 0.6)
      );
    }
  };

  Cell.prototype.tick = function (gameState) {
    this.updateBoundingBox(gameState);
    this.updateAnnotationsOverlayState(gameState);
    this.updateHighlighting(gameState);
    this.updateCellClickState(gameState);
    this.updateCellDblClickState(gameState);
  };

  Cell.prototype.draw = function (ctx) {
    // if (this.state.highlighted === true) {
    //   ctx.fillRect(
    //     this.state.scaledPosition.x,
    //     this.state.scaledPosition.y,
    //     this.state.scaledSize,
    //     this.state.scaledSize
    //   );
    // }

    this.drawAnnotationSelector(ctx);
    this.drawAnnotations(ctx);
    this.drawValue(ctx);
  };

  module.exports = Cell;

}());
