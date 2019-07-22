const Objects = require('./Objects');

module.exports = class Parser {
    constructor(nickname, pixiApp) {
        this.pixiApp = pixiApp;
        this.objects = new Objects(nickname);
        this.client = null;
        this.shot = true;
    }

    work(data) {
        const jsonData = JSON.parse(data);

        switch (jsonData.method) {
            case 'verify':
                this.client.send(this.toJson(jsonData.method));
                
                break;
            
            case 'objects':
                const players = jsonData.players;
                const ownPlayers = this.objects.getPlayers;

                for (const player of players) {
                    const {nickname, pos_x: posX, pos_y: posY} = player;
    
                    if (!ownPlayers.includes(nickname)) {
                        this.objects.addPlayer(nickname);
                        this.pixiApp.addPlayer(nickname);
                    }
    
                    this.pixiApp.move(nickname, {posX, posY});
                }
    
                for (const playerName of ownPlayers) {
                    if (players.includes(playerName)) {
                        continue;
                    }
    
                    this.objects.delPlayer(this.objects.getNickname);
                }

                break;

            default:
                break;
        }
    }

    setClient(client) {
        this.client = client;
    }

    toJson(type) {
        console.log(`type: ${type}`);

        switch(type) {
            case 'verify':
                const verifyJson = {
                    method: type,
                    nickname: this.objects.getNickname,
                    width: 800,
                    height: 600,
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
