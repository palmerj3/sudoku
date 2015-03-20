(function () {
  'use strict';

  var Cell = function (position) {
    this.config = {
      annotations: {
        font: 'serif',
        fontSize: 0.3,
        padding: 0.06,
        color: '#cccccc',
        hoverColor: '#ff0000'
      },
      selection: {
        font: 'serif',
        fontSize: 0.6,
        userSelectedColor: '#ff0000',
        nonMutableColor: '#000000',
        paddingLeft: 2,
        paddingTop: 5
      }
    };

    this.state = {
      position: position,
      scaledPosition: {
        x: null,
        y: null
      },
      scaledSize: null,
      value: null,
      valueUserEntered: true,
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

  Cell.prototype.updateAnnotationsOverlayState = function (gameState) {
    
    if (gameState.isMobile === false) {
      // Clear annotations overlay since it is triggered via mouse over
      this.state.showAnnotationsOverlay = false;
    }

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
    if (gameState.mouseclick !== null && this.state.value === null) {
      if (
        gameState.mouseclick.x >= this.state.scaledPosition.x &&
        gameState.mouseclick.y >= this.state.scaledPosition.y &&
        gameState.mouseclick.x <= (this.state.scaledPosition.x + this.state.scaledSize) &&
        gameState.mouseclick.y <= (this.state.scaledPosition.y + this.state.scaledSize)
      ) {

        if (gameState.isMobile === true && this.state.showAnnotationsOverlay === false) {
          this.state.showAnnotationsOverlay = true;
        } else {
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
    }
  };

  Cell.prototype.updateCellDblClickState = function (gameState) {
    if (gameState.mousedblclick !== null && this.state.valueUserEntered === true) {
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
        nudgeOffset = this.state.scaledSize * this.config.annotations.padding,
        scaledFontSize = this.state.scaledSize * this.config.annotations.fontSize;

    if (this.state.showAnnotationsOverlay === true) {
      for (var i=0; i < 9; i++) {
        if (i % 3 === 0) {
          heightOffset++;
        }

        ctx.font = scaledFontSize + "px " + this.config.annotations.font;
        
        if (this.state.annotationHighlighted === i) {
          ctx.fillStyle = this.config.annotations.hoverColor;
        } else {
          ctx.fillStyle = this.config.annotations.color;
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
        nudgeOffset = this.state.scaledSize * this.config.annotations.padding,
        scaledFontSize = this.state.scaledSize * this.config.annotations.fontSize;

    for (var i=0; i < 9; i++) {
      if (i % 3 === 0) {
        heightOffset++;
      }

      ctx.font = scaledFontSize + "px " + this.config.annotations.font;
      ctx.fillStyle = this.config.annotations.hoverColor;
      
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
      ctx.font = this.state.scaledSize * 
                 this.config.selection.fontSize + "px " +
                 this.config.selection.font;
      
      if (this.state.valueUserEntered === true) {
        ctx.fillStyle = this.config.selection.userSelectedColor;  
      } else {
        ctx.fillStyle = this.config.selection.nonMutableColor;
      }
      
      ctx.fillText(
        this.state.value,
        this.config.selection.paddingLeft       + 
                    this.state.scaledPosition.x + 
                    (this.state.scaledSize * this.config.selection.fontSize / 2),
        this.config.selection.paddingTop        +
                    this.state.scaledPosition.y + 
                    (this.state.scaledSize * this.config.selection.fontSize)
      );
    }
  };

  Cell.prototype.tick = function (gameState) {
    this.updateBoundingBox(gameState);
    this.updateAnnotationsOverlayState(gameState);
    this.updateCellClickState(gameState);
    this.updateCellDblClickState(gameState);
  };

  Cell.prototype.draw = function (ctx) {
    this.drawAnnotationSelector(ctx);
    this.drawAnnotations(ctx);
    this.drawValue(ctx);
  };

  module.exports = Cell;

}());
