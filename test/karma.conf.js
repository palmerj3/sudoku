module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    files: [
      './compiled.spec.js'
    ],
    client: {
      captureConsole: true
    }
  });
};