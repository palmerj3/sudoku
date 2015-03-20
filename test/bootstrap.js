if (window.__karma__) {
  var Util = require('../components/util');

  // PhantomJS does not support bind natively
  Util.polyfill.bind.install();
}

require('../components/game/index.spec');
require('../components/grid/index.spec');
require('../components/cell/index.spec');
