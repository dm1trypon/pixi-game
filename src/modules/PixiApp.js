const PIXI = require('pixi.js');

module.exports = class PixiApp {
    constructor() {
        this.app = new PIXI.Application({
            width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
        });

        this.players = new Map();
        this.bullets = new Map();
        this.txPlayer = PIXI.Texture.from('http://localhost:3000/player');
        this.txBullet = PIXI.Texture.from('http://localhost:3000/bullet');

        document.body.appendChild(this.app.view);
    }

    addPlayer(nickname) {
        const player = new PIXI.Sprite(this.txPlayer);

        this.players.set(nickname, player);

        player.x = 100;
        player.y = 100;

        this.app.stage.addChild(player);
    }

    addBullet(idBullet) {
        const bullet = new PIXI.Sprite(this.txBullet);

        this.bullets.set(idBullet, bullet);

        bullet.width = 20;
        bullet.height = 20;
        bullet.x = 100;
        bullet.y = 100;

        this.app.stage.addChild(bullet);
    }

    delPlayer(nickname) {
        this.app.stage.removeChild(this.players[nickname]);
        this.players.delete(nickname);
    }

    delBullet(idBullet) {
        if (!this.bullets.has(idBullet)) {
            console.log(`Can not find a bullet: ${idBullet}`);

            return;
        }

        console.log(`Delete bullet: ${idBullet}`);
        this.app.stage.removeChild(this.bullets[idBullet]);
        this.bullets.delete(idBullet);
    }

    movePlayer(nickname, position) {
        const object = this.players.get(nickname);

        if (!object) {
            return;
        }

        const {posX, posY} = position;

        object.x = posX;
        object.y = posY;
    }

    moveBullet(idBullet, position) {
        const object = this.bullets.get(idBullet);

        if (!object) {
            return;
        }

        const {posX, posY} = position;

        object.x = posX;
        object.y = posY;
    }
}

