const Objects = require('./Objects');

module.exports = class Parser {
    constructor(nickname, pixiApp) {
        this.pixiApp = pixiApp;
        this.objects = new Objects(nickname);
        this.client = null;
        this.shot = true;
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
                const {players, bullets} = jsonData;

                const ownPlayers = this.objects.getPlayers;
                const ownBullets = this.objects.getBullets;

                let bNames = [];
                let pNames = [];

                for (const player of players) {
                    const {nickname, pos_x: posX, pos_y: posY} = player;

                    pNames.push(nickname);
    
                    if (!ownPlayers.includes(nickname)) {
                        this.objects.addPlayer(nickname);
                        this.pixiApp.addPlayer(nickname);
                    }
    
                    this.pixiApp.movePlayer(nickname, {posX, posY});
                }

                for (const bullet of bullets) {
                    const {pos_x: posX, pos_y: posY, id_bullet: idBullet} = bullet;

                    bNames.push(idBullet);
    
                    if (!ownBullets.includes(idBullet)) {
                        this.objects.addBullet(idBullet);
                        this.pixiApp.addBullet(idBullet);
                    }
    
                    this.pixiApp.moveBullet(idBullet, {posX, posY});
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
        console.log(`type: ${type}`);

        switch(type) {
            case 'control':
                if (!data.hasOwnProperty(key) && !data.hasOwnProperty(isHold)) {
                    return '';
                }

                const {key, isHold} = data;

                const controlJson = {
                    method: type,
                    nickname: this.objects.getNickname,
                    key: key,
                    hold: isHold,
                }
                
                console.log(`json: ${JSON.stringify(controlJson)}`);

                return JSON.stringify(verifyJson);

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
                const shotJson = {
                    method: type,
                    nickname: this.objects.getNickname,
                    weapon: 'plazma',
                    x: 100,
                    y: 100,
                };

                console.log(`json: ${JSON.stringify(shotJson)}`);

                return JSON.stringify(shotJson);

            default:
                break;
        }
    }
}
