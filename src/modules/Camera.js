module.exports = class Camera {
    constructor(resolution) {
        this.resolution = resolution;
        this.factor = {factorX: null, factorY: null};
        this.sizePlayer = {width: 100, height: 100};
    }

    setOffsetFactor(position) {
        const {width, height} = this.resolution;
        const {posX, posY} = position;

        this.factor = {factorX: posX - width / 2, factorY: posY - height / 2};
    }

    setPositionObjects(position) {
        const {posX, posY} = position;
        const {factorX, factorY} = this.factor;
        const {width, height} = this.sizePlayer;

        return {ofPosX: posX - factorX - width / 2, ofPosY: posY - factorY - height / 2};
    }

    setCursor(position) {
        const {posX, posY} = position;
        const {factorX, factorY} = this.factor;
        const {width, height} = this.sizePlayer;

        return {ofPosX: posX + factorX + width / 2, ofPosY: posY + factorY + height / 2};
    }
}
