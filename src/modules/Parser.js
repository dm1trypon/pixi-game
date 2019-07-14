const Objects = require('./Objects');

module.exports = class Parser {
    constructor(nickname) {
        this.objects = new Objects(nickname);
        this.connection = null;
        this.shot = true;
    }

    work(data) {
        const jsonData = JSON.parse(data);

        switch (jsonData.method) {
            case 'verify':
                this.connection.sendUTF(this.toJson(jsonData.method));
                
                break;
            
            case 'objects':
                const players = jsonData.players;
                const ownPlayers = this.objects.getPlayers;

                for (const player of players) {
                    const {nickname} = player;
    
                    if (ownPlayers.includes(nickname)) {
                        continue;
                    }
    
                    this.objects.addPlayer(nickname);
                }
    
                for (const playerName of ownPlayers) {
                    if (players.includes(playerName)) {
                        continue;
                    }
    
                    this.objects.delPlayer(this.objects.getNickname);
                }

                if (!this.shot) {
                    break;
                }

                this.connection.sendUTF(this.toJson('shot'));
                this.shot = false;

                break;

            default:
                break;
        }
    }

    setConnection(connection) {
        this.connection = connection;
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