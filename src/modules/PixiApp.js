const PIXI = require('pixi.js');
const Camera = require('./Camera');
const Objects = require('./Objects');
const TextInput = require('./TextInput');

module.exports = class PixiApp {
    constructor(resolution, parent) {
        this.resolution = resolution;
        this.parent = parent;
        
        const {width, height} = this.resolution;

        this.objects = Objects.getInstance();
        this.camera = new Camera(resolution);
        this.objects.setCamera(this.camera);

        this.app = new PIXI.Application({
            width, height, backgroundColor: 0x000000, resolution: window.devicePixelRatio || 1,
        });

        const defaultIcon = "url('http://10.23.0.59:3000/cursor'),auto";

        this.app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;

        this.players = {};
        this.bullets = {};
        this.scenes = {};
        this.textInput = null;
        this.health = null;

        this.txPlayer = PIXI.Texture.from('http://10.23.0.59:3000/player');
        this.txPlazma = PIXI.Texture.from('http://10.23.0.59:3000/plazma');
        this.txBlaster = PIXI.Texture.from('http://10.23.0.59:3000/blaster');
        this.txMachineGun = PIXI.Texture.from('http://10.23.0.59:3000/machineGun');
        this.txScene = PIXI.Texture.from('http://10.23.0.59:3000/scene');

        document.body.appendChild(this.app.view);

        this.mainContainer = new PIXI.Container();
        this.mainContainer.sortableChildren = true;
        this.app.stage.addChild(this.mainContainer);
    }

    onStart(nickname) {
        if (!nickname) {
            return;
        }

        if (!this.textInput) {
            return;
        }

        this.objects.nickname = nickname;
        this.textInput.remove();
        this.addHealth(100);
        this.parent.start();
    }

    addMenu() {
        const {width, height} = this.resolution;

        this.textInput = new TextInput({text: 'nickname', width: 400}, {fontFamily : 'Arial', fontSize: 80, fill : 0x000000, align : 'center'}, this);

        this.textInput.x = width / 2 - 200;
        this.textInput.y = height / 2 - 40;
        this.textInput.backgroundColor = 0xCCCCCC;
        this.textInput.borderColor = 0xA9A9A9;
        this.textInput.borderDepth = 5;

        this.textInput.create();
    }

    addScene(data) {
        const {name, posX, posY, width, height} = data;
        const scene = new PIXI.TilingSprite(this.txScene, width, height);

        scene.x = posX;
        scene.y = posY;
        scene.width = width;
        scene.height = height;

        this.scenes[name] = scene;
        this.mainContainer.addChild(scene);
    }

    addExplosion(data) {
        const {posX, posY, width, height} = data;
        const {ofPosX, ofPosY} = this.camera.setPositionObjects({posX, posY});

        const explosionFrames = [ 
            'http://10.23.0.59:3000/explosion/0',
            'http://10.23.0.59:3000/explosion/1',
            'http://10.23.0.59:3000/explosion/2',
            'http://10.23.0.59:3000/explosion/3',
            'http://10.23.0.59:3000/explosion/4',
            'http://10.23.0.59:3000/explosion/5',
            'http://10.23.0.59:3000/explosion/6',
            'http://10.23.0.59:3000/explosion/7',
            'http://10.23.0.59:3000/explosion/8',
        ];
        
        const animatedCapguy = PIXI.AnimatedSprite.fromFrames(explosionFrames);

        animatedCapguy.x = ofPosX;
        animatedCapguy.y = ofPosY;
        animatedCapguy.width = 200;
        animatedCapguy.height = 200;
        animatedCapguy.animationSpeed = 0.5;
        animatedCapguy.loop = false;
        animatedCapguy.play();

        this.mainContainer.addChild(animatedCapguy);
    }

    addHealth(health) {
        const {height} = this.resolution;

        this.health = new PIXI.Text(health, {fontFamily : 'Arial', fontSize: 80, fill : 0xCCCCCC});
        this.health.x = 30;
        this.health.y = height - 120;
        this.health.zIndex = 50;

        this.mainContainer.addChild(this.health);
    }

    setHealth(health) {
        this.health.text = health;
    }

    addPlayer(data) {
        const player = new PIXI.Sprite(this.txPlayer);
        const {nickname, posX, posY, width: pWidth, height: pHeight} = data;

        player.zIndex = 4;

        if (this.objects.getNickname === nickname) {
            const {width, height} = this.resolution;

            this.camera.setOffsetFactor({posX, posY});

            player.x = width / 2;
            player.y = height / 2;
        } else {
            const {ofPosX, ofPosY} = this.camera.setPositionObjects({posX, posY});

            player.x = ofPosX;
            player.y = ofPosY;
        }

        player.width = pWidth;
        player.height = pHeight;
        player.pivot.x = 130;
        player.pivot.y = 130;

        this.players[nickname] = player;
        this.mainContainer.addChild(player);
    }

    addBullet(data) {
        
        const {idBullet, posX, posY, width: bWidth, height: bHeight, weapon, rotation} = data;

        let txWeapon;

        switch (weapon) {
            case 'blaster':
                txWeapon = this.txBlaster;

                break;

            case 'plazma':
                txWeapon = this.txPlazma;
                
                break;

            case 'machine_gun':
                txWeapon = this.txMachineGun;
                
                break;

            default:
                txWeapon = this.txBlaster;
                    
                break;
        }
        
        const bullet = new PIXI.Sprite(txWeapon);

        bullet.zIndex = 3;
        bullet.width = bWidth;
        bullet.height = bHeight;
        bullet.pivot.x = 40;
        bullet.pivot.y = 40;

        const {ofPosX, ofPosY} = this.camera.setPositionObjects({posX, posY});

        bullet.x = ofPosX;
        bullet.y = ofPosY;
        bullet.rotation = rotation * 3.14 / 180;

        this.bullets[idBullet] = bullet;
        this.mainContainer.addChild(bullet);
    }

    delPlayer(data) {
        const {nickname} = data;

        if (!this.players.hasOwnProperty(nickname)) {
            console.log(`Can not find a player: ${nickname}`);

            return;
        }

        this.mainContainer.removeChild(this.players[nickname]);
        this.addExplosion(data);

        delete this.players.nickname;
    }

    delBullet(idBullet) {
        if (!this.bullets.hasOwnProperty(idBullet)) {
            console.log(`Can not find a bullet: ${idBullet}`);

            return;
        }

        this.mainContainer.removeChild(this.bullets[idBullet]);

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
            object.rotation = rotation * 3.14 / 180;

            return;
        }

        const {ofPosX, ofPosY} = this.camera.setPositionObjects({posX, posY});

        object.x = ofPosX + 50;
        object.y = ofPosY + 50;
        object.rotation = rotation * 3.14 / 180;
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
