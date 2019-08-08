const Objects = require('./Objects');

module.exports = class Parser {
    constructor(nickname, pixiApp) {
        this.pixiApp = pixiApp;
        this.objects = new Objects(nickname);
        this.client = null;
        this.shot = true;
    }

    get getObjects() {
        return this.objects;
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

                this.client.send(this.toJson(jsonData.method, {}));
                
                break;
            
            case 'objects':
                const {players, bullets, scene} = jsonData;

                const ownScene = this.objects.getScene;
                const ownPlayers = this.objects.getPlayers;
                const ownBullets = this.objects.getBullets;

                let sNames = [];
                let bNames = [];
                let pNames = [];

                const {pos_x: posX, pos_y: posY, width, height} = scene;
                const dataScene = {name: 'scene', posX, posY, width, height};

                if (!ownScene.includes(name)) {
                    this.objects.addScene(name);
                    this.pixiApp.addScene(dataScene);
                }

                sNames.push()

                for (const player of players) {
                    const {nickname, pos_x: posX, pos_y: posY} = player;
                    const dataPlayer = {nickname, posX, posY};

                    pNames.push(nickname);
    
                    if (!ownPlayers.includes(nickname)) {
                        this.objects.addPlayer(nickname);
                        this.pixiApp.addPlayer(dataPlayer);
                    }
    
                    this.pixiApp.movePlayer(dataPlayer);
                }

                for (const bullet of bullets) {
                    const {pos_x: posX, pos_y: posY, id_bullet: idBullet} = bullet;
                    const dataBullet = {idBullet, posX, posY};

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
                    this.pixiApp.delPlayer(playerName);
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
                const {posX, posY} = data;

                const cursorJson = {
                    method: type,
                    nickname: this.objects.getNickname,
                    pos_x: posX,
                    pos_y: posY,
                }

                console.log(`json: ${JSON.stringify(cursorJson)}`);

                return JSON.stringify(cursorJson);

            case 'verify':
                const verifyJson = {
                    method: type,
                    nickname: this.objects.getNickname,
                    width: 1920,
                    height: 1080,
                };

                console.log(`json: ${JSON.stringify(verifyJson)}`);

                return JSON.stringify(verifyJson);

            case 'shot':
                const {x, y, weapon} = data;

                const shotJson = {
                    method: type,
                    nickname: this.objects.getNickname,
                    weapon,
                    x,
                    y,
                };

                console.log(`json: ${JSON.stringify(shotJson)}`);

                return JSON.stringify(shotJson);

            default:
                break;
        }
    }
}
