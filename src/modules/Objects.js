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

    addBullet(idBullet) {
        this.bullets.push(idBullet);
    }

    delPlayer(nickname) {
        console.log(`DEL_PLAYERS: ${nickname}`);
        this.players.splice(this.players.indexOf(nickname), 1);
    }

    delBullet(idBullet) {
        this.bullets.splice(this.bullets.indexOf(idBullet), 1);
    }

    get getPlayers() {
        console.log(`OWN_PLAYERS: ${this.players}`);
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
