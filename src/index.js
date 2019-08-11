const uuidv4 = require('uuid/v4');

const GameClient = require('./modules/GameClient');

const gameClient = new GameClient('localhost', 44444, `${uuidv4()}`);
gameClient.start();
