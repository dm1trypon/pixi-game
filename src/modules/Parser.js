const Objects = require('./Objects');

module.exports = class Parser {
    constructor(pixiApp) {
        this.pixiApp = pixiApp;
        this.client = null;
        this.shot = true;
        this.objects = Objects.getInstance();
    }

    onSend(data) {
        if (!this.client) {
            return;
        }

        this.client.send(data);
    }

    work(data) {
        const jsonData = JSON.parse(data);

        switch (jsonData.method) {
            case 'verify':
                if (!this.client) {
                    return;
                }

                const {width: resWidth, height: resHeight} = this.objects.getResolution;

                this.client.send(this.toJson(jsonData.method, {nickname: this.objects.getNickname, width: resWidth / 2, height: resHeight / 2}));
                
                break;
            
            case 'objects':
                const {players, bullets, scene} = jsonData;

                const ownScene = this.objects.getScene;
                const ownPlayers = this.objects.getPlayers;
                const ownBullets = this.objects.getBullets;

                let bNames = [];
                let pNames = [];

                const {pos_x: posX, pos_y: posY, width, height} = scene;
                const dataScene = {name: 'scene', posX, posY, width, height};

                if (!ownScene.includes(name)) {
                    this.objects.addScene(name);
                    this.pixiApp.addScene(dataScene);
                }

                this.pixiApp.moveScene(dataScene);

                const playersObjs = {};

                for (const player of players) {
                    const {nickname, pos_x: posX, pos_y: posY, width, height, rotation} = player;
                    const dataPlayer = {nickname, posX, posY, width, height, rotation};
                    
                    playersObjs[nickname] = dataPlayer;

                    pNames.push(nickname);
    
                    if (!ownPlayers.includes(nickname)) {
                        this.objects.addPlayer(nickname);
                        this.pixiApp.addPlayer(dataPlayer);
                    }
    
                    this.pixiApp.movePlayer(dataPlayer);
                }

                for (const bullet of bullets) {
                    const {pos_x: posX, pos_y: posY, id_bullet: idBullet, width, height} = bullet;
                    const dataBullet = {idBullet, posX, posY, width, height};

                    bNames.push(idBullet);
    
                    if (!ownBullets.includes(idBullet)) {
                        this.objects.addBullet(idBullet);
                        this.pixiApp.addBullet(dataBullet);
                    }
    
                    this.pixiApp.moveBullet(dataBullet);
                }
    
                for (const playerName of ownPlayers) {
                    if (pNames.includes(playerName)) {
                        continue;
                    }

                    this.objects.delPlayer(playerName);
                    this.pixiApp.delPlayer(playersObjs[playerName]);
                }

                for (const idBullet of ownBullets) {
                    if (bNames.includes(idBullet)) {
                        continue;
                    }
    
                    this.objects.delBullet(idBullet);
                    this.pixiApp.delBullet(idBullet);
                }

                break;

            default:
                break;
        }
    }

    setClient(client) {
        this.client = client;
    }

    toJson(type, data) {
        switch(type) {
            case 'control':
                const {key, isHold} = data;

                const controlJson = {
                    method: type,
                    nickname: this.objects.getNickname,
                    key: key,
                    hold: isHold,
                }
                
                console.log(`json: ${JSON.stringify(controlJson)}`);

                return JSON.stringify(controlJson);

            case 'cursor':
                const {posX, posY, offsetX, offsetY, isShot} = data;

                const cursorJson = {
                    method: type,
                    nickname: this.objects.getNickname,
                    pos_x: posX,
                    pos_y: posY,
                    offset_x: offsetX,
                    offset_y: offsetY,
                    is_shot: isShot,
                    weapon: this.objects.getWeapon,
                }

                console.log(`json: ${JSON.stringify(cursorJson)}`);

                return JSON.stringify(cursorJson);

            case 'verify':
                const {nickname, width, height} = data;

                const verifyJson = {
                    method: type,
                    nickname: nickname,
                    width,
                    height,
                };

                console.log(`json: ${JSON.stringify(verifyJson)}`);

                return JSON.stringify(verifyJson);

            default:
                break;
        }
    }
}
