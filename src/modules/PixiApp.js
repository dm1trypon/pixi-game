const PIXI = require('pixi.js');
const Camera = require('./Camera');
const Objects = require('./Objects');

module.exports = class PixiApp {
    constructor(resolution) {
        this.resolution = resolution;
        
        const {width, height} = this.resolution;

        this.objects = Objects.getInstance();
        this.camera = new Camera(resolution);
        this.objects.setCamera(this.camera);

        this.app = new PIXI.Application({
            width, height, backgroundColor: 0x000000, resolution: window.devicePixelRatio || 1,
        });

        const defaultIcon = "url('http://localhost:3000/cursor'),auto";

        this.app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;

        this.players = {};
        this.bullets = {};
        this.scenes = {};

        this.txPlayer = PIXI.Texture.from('http://localhost:3000/player');
        this.txBullet = PIXI.Texture.from('http://localhost:3000/bullet');
        this.txScene = PIXI.Texture.from('http://localhost:3000/scene');

        document.body.appendChild(this.app.view);
    }

    addScene(data) {
        const {name, posX, posY, width, height} = data;
        const scene = new PIXI.TilingSprite(this.txScene, width, height);

        scene.x = posX;
        scene.y = posY;
        scene.width = width;
        scene.height = height;
        scene.zIndex = 0;

        this.scenes[name] = scene;
        this.app.stage.addChild(scene);
    }

    addPlayer(data) {
        const player = new PIXI.Sprite(this.txPlayer);
        const {nickname, posX, posY} = data;
        const {width: pWidth, height: pHeight} = this.objects.getSizePlayer;

        if (this.objects.getNickname === nickname) {
            const {width, height} = this.resolution;

            this.camera.setOffsetFactor({posX, posY});

            player.x = width / 2 - pWidth / 2;
            player.y = height / 2 - pHeight / 2;
        } else {
            const {ofPosX, ofPosY} = this.camera.setPositionObjects({posX, posY});

            player.x = ofPosX - pWidth / 2;
            player.y = ofPosY - pHeight / 2;
        }

        player.width = pWidth;
        player.height = pHeight;
        player.zIndex = 1;
        player.pivot.x = pWidth / 2;
        player.pivot.y = pHeight / 2;

        this.players[nickname] = player;
        this.app.stage.addChild(player);
    }

    addBullet(data) {
        console.log(data);
        const bullet = new PIXI.Sprite(this.txBullet);
        const {idBullet, posX, posY} = data;
        const {width: bWidth, height: bHeight} = this.objects.getSizeBullet;
        
        bullet.width = bWidth;
        bullet.height = bHeight;
        bullet.zIndex = 2;

        const {ofPosX, ofPosY} = this.camera.setPositionObjects({posX, posY});

        bullet.x = ofPosX;
        bullet.y = ofPosY;

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
        const {nickname, posX, posY, rotation} = data;

        if (!this.players.hasOwnProperty(nickname)) {
            console.log(`Can not find a player: ${nickname}`);

            return;
        }

        const object = this.players[nickname];

        if (!object) {
            return;
        }

        if (this.objects.getNickname === nickname) {
            this.camera.setOffsetFactor({posX, posY});
            object.rotation = rotation / 3.14;

            return;
        }

        const {ofPosX, ofPosY} = this.camera.setPositionObjects({posX, posY});

        object.x = ofPosX;
        object.y = ofPosY;
        object.rotation = rotation / 3.14;
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

        const {ofPosX, ofPosY} = this.camera.setPositionObjects({posX, posY});

        object.x = ofPosX;
        object.y = ofPosY;
    }

    moveScene(data) {
        const {name, posX, posY} = data;

        if (!this.scenes.hasOwnProperty(name)) {
            console.log(`Can not find a bullet: ${name}`);

            return;
        }
        
        const object = this.scenes[name];

        if (!object) {
            return;
        }

        const {ofPosX, ofPosY} = this.camera.setPositionObjects({posX, posY});

        object.x = ofPosX;
        object.y = ofPosY;
    }
}

