(function() {
  'use strict';

  var Game = require('./game');

  var game = new Game('game');
  game.initialize();

  game.loadGame({
    '2-0': 6,
    '3-0': 1,
    '4-0': 8,
    '5-0': 4,
    '7-0': 9,
    '0-1': 1,
    '1-1': 5,
    '2-1': 9,
    '5-1': 3,
    '8-1': 2,
    '1-2': 8,
    '5-2': 9,
    '6-2': 6,
    '7-2': 1,
    '0-3': 8,
    '2-3': 2,
    '3-3': 3,
    '5-3': 5,
    '8-3': 9,
    '0-4': 6,
    '2-4': 7,
    '3-4': 9,
    '4-4': 4,
    '6-4': 5,
    '2-5': 5,
    '3-5': 6,
    '6-5': 7,
    '7-5': 2,
    '8-5': 4,
    '0-6': 5,
    '1-6': 3,
    '4-6': 9,
    '5-6': 6,
    '6-6': 4,
    '7-6': 7,
    '1-7': 6,
    '4-7': 3,
    '5-7': 7,
    '6-7': 2,
    '8-7': 8,
    '0-8': 2,
    '1-8': 7,
    '3-8': 8,
    '4-8': 5,
    '7-8': 3
  });

}());