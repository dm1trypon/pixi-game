const PIXI = require('pixi.js');

module.exports = class PixiApp {
    constructor(resolution) {
        this.resolution = resolution;
        
        const {width, height} = this.resolution;

        this.app = new PIXI.Application({
            width, height, backgroundColor: 0x000000, resolution: window.devicePixelRatio || 1,
        });

        this.players = {};
        this.bullets = {};
        this.scenes = {};

        this.txPlayer = PIXI.Texture.from('http://localhost:3000/player');
        this.txBullet = PIXI.Texture.from('http://localhost:3000/bullet');
        this.txScene = PIXI.Texture.from('http://localhost:3000/scene');

        document.body.appendChild(this.app.view);
    }

    addScene(data) {
        const {posX, posY, width, height} = data;
        const scene = new PIXI.TilingSprite(this.txScene, width, height);

        scene.x = posX;
        scene.y = posY;
        scene.width = width;
        scene.height = height;

        this.scenes['scene'] = scene;
        this.app.stage.addChild(scene);
    }

    addPlayer(data) {
        const player = new PIXI.Sprite(this.txPlayer);
        const {nickname, posX, posY} = data;

        player.x = posX;
        player.y = posY;
        player.width = 100;
        player.height = 100;

        this.players[nickname] = player;
        this.app.stage.addChild(player);
    }

    addBullet(data) {
        const bullet = new PIXI.Sprite(this.txBullet);
        const {idBullet, posX, posY} = data;

        bullet.width = 30;
        bullet.height = 30;
        bullet.x = posX;
        bullet.y = posY;

        this.bullets[idBullet] = bullet;
        this.app.stage.addChild(bullet);
    }

    delPlayer(nickname) {
        if (!this.players.hasOwnProperty(nickname)) {
            console.log(`Can not find a player: ${nickname}`);

            return;
        }

        this.app.stage.removeChild(this.players[nickname]);

        delete this.players.nickname;
    }

    delBullet(idBullet) {
        if (!this.bullets.hasOwnProperty(idBullet)) {
            console.log(`Can not find a bullet: ${idBullet}`);

            return;
        }

        this.app.stage.removeChild(this.bullets[idBullet]);

        delete this.bullets.idBullet;
    }

    movePlayer(data) {
        const {nickname, posX, posY} = data;

        if (!this.players.hasOwnProperty(nickname)) {
            console.log(`Can not find a player: ${nickname}`);

            return;
        }

        const object = this.players[nickname];

        if (!object) {
            return;
        }

        object.x = posX;
        object.y = posY;
    }

    moveBullet(data) {
        const {idBullet, posX, posY} = data;

        if (!this.bullets.hasOwnProperty(idBullet)) {
            console.log(`Can not find a bullet: ${idBullet}`);

            return;
        }
        
        const object = this.bullets[idBullet];

        if (!object) {
            return;
        }

        object.x = posX;
        object.y = posY;
    }
}

