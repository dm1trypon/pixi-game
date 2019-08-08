module.exports = class Framer {
    constructor(parser, control) {
        this.parser = parser;
        this.control = control;

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
        const {mousePos: {posX: x, posY: y}} = control.getMousePos;
        const weapon = parser.getObjects.getWeapon;

        if (!control.getIsPressed) {
            window.requestAnimationFrame(this.step.bind(this));

            return;
        }

        parser.onSend(parser.toJson('shot', {x, y, weapon}));

        window.requestAnimationFrame(this.step.bind(this));
    }
}
