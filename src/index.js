const GameClient = require('./modules/GameClient');

const gameClient = new GameClient('localhost', 44444, 'FreeMan');
gameClient.start();
