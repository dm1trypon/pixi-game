module.exports = class Framer {
    constructor() {
        this.setAnimation();
    }

    setAnimation() {
        const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        window.requestAnimationFrame = requestAnimationFrame;

        window.requestAnimationFrame(this.step.bind(this));
    }

    step() {
        console.log("lol");

        window.requestAnimationFrame(this.step.bind(this));
    }
}
