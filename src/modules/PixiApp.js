const PIXI = require('pixi.js');

module.exports = class PixiApp {
    constructor() {
        this.app = new PIXI.Application({
            width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
        });

        this.players = new Map();
        this.texture = PIXI.Texture.from('http://localhost:3000/bunny');

        document.body.appendChild(this.app.view);
    }

    addPlayer(nickname) {
        const bunny = new PIXI.Sprite(this.texture);

        this.players.set(nickname, bunny);

        bunny.x = 100;
        bunny.y = 100;

        this.app.stage.addChild(bunny);
    }

    move(nickname, position) {
        const bunny = this.players.get(nickname);
        const {posX, posY} = position;

        bunny.x = posX;
        bunny.y = posY;
    }
}

