const Objects = require('./Objects');

module.exports = class Framer {
    constructor(parser, control) {
        this.parser = parser;
        this.control = control;
        this.objects = Objects.getInstance();

        this.setAnimation();
    }

    setAnimation() {
        const requestAnimationFrame = window.requestAnimationFrame ||
                                      window.mozRequestAnimationFrame ||
                                      window.webkitRequestAnimationFrame ||
                                      window.msRequestAnimationFrame;

        window.requestAnimationFrame = requestAnimationFrame;

        window.requestAnimationFrame(this.step.bind(this));
    }

    step() {
        const {parser, control} = this;
        const {mousePos: {posX, posY}} = control.getMousePos;

        const camera = Objects.getInstance().getCamera;
        const {ofPosX, ofPosY} = camera.setCursor({posX, posY});

        const {getIsPressed} = control;

        if (!getIsPressed) {
            window.requestAnimationFrame(this.step.bind(this));

            return;
        }

        parser.onSend(parser.toJson('cursor', {posX: posX + 50, posY: posY + 50, offsetX: ofPosX + 50, offsetY: ofPosY + 50, isShot: getIsPressed}));

        window.requestAnimationFrame(this.step.bind(this));
    }
}
