const GameClient = require('./modules/GameClient');

const gameClient = new GameClient('10.23.0.59', 44444);

gameClient.enterGame();
