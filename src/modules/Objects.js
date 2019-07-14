module.exports = class Objects {
    constructor(nickname) {
        this.players = [];
        this.bullets = [];
        this.nickname = nickname;
        this.resolution = {
            width: 800,
            height: 600,
        };
    }

    addPlayer(nickname) {
        this.players.push(nickname);
    }

    delPlayer(nickname) {
        this.players.splice(this.players.indexOf(nickname), 1);
    }

    get getPlayers() {
        return this.players;
    }

    get getBullets() {
        return this.bullets;
    }

    get getNickname() {
        return this.nickname;
    }

    get getResolution() {
        return this.resolution;
    }
}