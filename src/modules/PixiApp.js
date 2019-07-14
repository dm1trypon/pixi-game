const PIXI = require('pixi.js');
const GameClient = require('./GameClient');

module.exports = class PixiApp {
    constructor() {
        this.app = new PIXI.Application({
            width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
        });

        this.gameClient = new GameClient('localhost', 44444, 'FreeMan');
        this.process();
    }

    process() {
        document.body.appendChild(this.app.view);

        const texture = PIXI.Texture.from('http://localhost:3000/bunny');
        const bunny = new PIXI.Sprite(texture);

        bunny.x = 100;
        bunny.y = 100;

        this.app.stage.addChild(bunny);

        this.app.ticker.add((delta) => {
            bunny.x += 2 * delta;
            bunny.y += 2 * delta;
        });
    }
}

