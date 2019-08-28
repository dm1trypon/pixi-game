module.exports = class Objects {
    constructor() {
        this.weapon = 'blaster';
        this.players = {};
        this.bullets = [];
        this.walls = [];
        this.scene = [];
        this.nickname = null;
        this.resolution = null;
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

    addPlayer(dataPlayer) {
        const {nickname} = dataPlayer;

        this.players[nickname] = dataPlayer;
    }

    addWall(idWall) {
        this.walls.push(idWall);
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
        delete this.players[nickname];
    }

    delBullet(idBullet) {
        this.bullets.splice(this.bullets.indexOf(idBullet), 1);
    }

    delWall(idWall) {
        this.walls.splice(this.walls.indexOf(idWall), 1);
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

    get getWalls() {
        return this.walls;
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

    get getCamera() {
        return this.camera;
    }
}
