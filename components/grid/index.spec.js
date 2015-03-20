var Grid = require('./index');
var Cell = require('../cell');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var expect = chai.expect;
chai.use(sinonChai);

describe('Grid', function () {

  var grid = null;

  beforeEach(function() {
    grid = new Grid();
  });

  describe('#tick()', function () {
    it('should call all necessary tick methods', function () {
      for (var x = 0; x < 9; x++) {
        for (var y = 0; y < 9; y++) {
          sinon.stub(grid.state.cells[x + '-' + y], 'tick');
        }
      }

      grid.tick();

      for (var x = 0; x < 9; x++) {
        for (var y = 0; y < 9; y++) {
          expect(grid.state.cells[x + '-' + y].tick).to.have.been.called;
        }
      }
    });
  });

  describe('#draw()', function () {
    it('should call all necessary draw methods', function () {
      for (var x = 0; x < 9; x++) {
        for (var y = 0; y < 9; y++) {
          sinon.stub(grid.state.cells[x + '-' + y], 'draw');
        }
      }

      sinon.stub(grid, 'drawGrid');

      grid.draw();

      expect(grid.drawGrid).to.have.been.called;

      for (var x = 0; x < 9; x++) {
        for (var y = 0; y < 9; y++) {
          expect(grid.state.cells[x + '-' + y].draw).to.have.been.called;
        }
      }
    });
  });
});
