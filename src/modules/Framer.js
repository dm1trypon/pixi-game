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
        const weapon = this.objects.getWeapon;

        const camera = Objects.getInstance().getCamera;
        const {ofPosX, ofPosY} = camera.setCursor({posX, posY});

        if (!control.getIsPressed) {
            window.requestAnimationFrame(this.step.bind(this));

            return;
        }

        parser.onSend(parser.toJson('cursor', {posX: ofPosX + 50, posY: ofPosY + 50, isShot: true, weapon}));

        window.requestAnimationFrame(this.step.bind(this));
    }
}
