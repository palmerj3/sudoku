var Cell = require('./index');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var expect = chai.expect;
chai.use(sinonChai);

describe('Cell', function () {

  var cell = null;

  beforeEach(function() {
    cell = new Cell('0-0');
  });

  describe('#tick()', function () {
    it('should call all necessary tick methods', function () {
      sinon.stub(cell, 'updateBoundingBox');
      sinon.stub(cell, 'updateAnnotationsOverlayState');
      sinon.stub(cell, 'updateCellClickState');
      sinon.stub(cell, 'updateCellDblClickState');

      cell.tick();

      expect(cell.updateBoundingBox).to.have.been.called;
      expect(cell.updateAnnotationsOverlayState).to.have.been.called;
      expect(cell.updateCellClickState).to.have.been.called;
      expect(cell.updateCellDblClickState).to.have.been.called;
    });
  });

  describe('#draw()', function () {
    it('should call all necessary draw methods', function () {
      sinon.stub(cell, 'drawAnnotationSelector');
      sinon.stub(cell, 'drawAnnotations');
      sinon.stub(cell, 'drawValue');

      cell.draw();

      expect(cell.drawAnnotationSelector).to.have.been.called;
      expect(cell.drawAnnotations).to.have.been.called;
      expect(cell.drawValue).to.have.been.called;
    });
  });
});
