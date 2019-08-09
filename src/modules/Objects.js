module.exports = class Objects {
    constructor() {
        this.weapon = 'blaster';
        this.players = [];
        this.bullets = [];
        this.scene = [];
        this.nickname = null;
        this.resolution = null;
        this.sizePlayer = {width: 100, height: 100};
        this.sizeBullet = {width: 30, height: 30};
        this.camera = null;
    }

    static getInstance(...args) {
        if (!this.instance) {
            this.instance = new this(...args);
        }

        return this.instance;
    }

    setCamera(camera) {
        this.camera = camera;
    }

    setData(data) {
        const {nickname, resolution} = data;

        this.nickname = nickname;
        this.resolution = resolution;
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

    get getSizePlayer() {
        return this.sizePlayer;
    }

    get getSizeBullet() {
        return this.sizeBullet;
    }

    get getCamera() {
        return this.camera;
    }
}
