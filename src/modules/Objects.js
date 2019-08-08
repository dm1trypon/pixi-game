module.exports = class Objects {
    constructor(nickname) {
        this.weapon = 'blaster';
        this.players = [];
        this.bullets = [];
        this.scene = [];
        this.nickname = nickname;
        this.resolution = {
            width: 1920,
            height: 1080,
        };
    }

    addPlayer(nickname) {
        this.players.push(nickname);
    }

    addBullet(idBullet) {
        this.bullets.push(idBullet);
    }

    addScene(name) {
        this.scene.push(name);
    }

    delScene(name) {
        this.scene.splice(this.scene.indexOf(name), 1);
    }

    delPlayer(nickname) {
        this.players.splice(this.players.indexOf(nickname), 1);
    }

    delBullet(idBullet) {
        this.bullets.splice(this.bullets.indexOf(idBullet), 1);
    }

    setWeapon(weapon) {
        this.weapon = weapon;
    }

    get getWeapon() {
        return this.weapon;
    }

    get getPlayers() {
        return this.players;
    }

    get getBullets() {
        return this.bullets;
    }

    get getScene() {
        return this.scene;
    }

    get getNickname() {
        return this.nickname;
    }

    get getResolution() {
        return this.resolution;
    }
}
