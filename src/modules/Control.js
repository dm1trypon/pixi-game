const Framer = require('./Framer');

module.exports = class Control {
    constructor(parser) {
        this.parser = parser;
        this.keysMap = new Map();
        this.directions = [];
        this.isPressed = false;
        this.interval = null;
        this.mousePos = {posX: null, posY: null};
        
        this.setKeys();
        this.setEvents();

        // new Framer(parser, this);
    }

    get getMousePos() {
        return {mousePos: this.mousePos}
    }

    get getIsPressed() {
        return this.isPressed;
    }

    setKeys() {
        this.keysMap.set("ArrowLeft", "left");
        this.keysMap.set("ArrowRight", "right");
        this.keysMap.set("ArrowUp", "up");
        this.keysMap.set("ArrowDown", "down");
        this.keysMap.set("a", "left");
        this.keysMap.set("d", "right");
        this.keysMap.set("w", "up");
        this.keysMap.set("s", "down");
    }

    isDirection(data) {
        const {direction, directions} = data;

        return directions.length && (direction === 'left' || direction === 'right');
    }

    setEvents() {
        const {parser, directions, keysMap} = this;

        document.addEventListener('mousedown', () => {
            this.isPressed = true;
        });

        document.addEventListener('mouseup', () => {
            this.isPressed = false;
            
            const {clientX: posX, clientY: posY} = event;

            this.mousePos = {posX, posY};

            parser.onSend(parser.toJson('cursor', {posX, posY, isShot: this.isPressed}));
        });

        document.addEventListener('mousemove', event => {
            const {clientX: posX, clientY: posY} = event;

            this.mousePos = {posX, posY};
            
            parser.onSend(parser.toJson('cursor', {posX, posY, isShot: this.isPressed}));
        });

        document.addEventListener('keydown', event => {
            const {key, repeat} = event;

            if (!keysMap.has(key)) {
                return;
            }

            if (repeat) {
                return;
            }

            const direction = keysMap.get(key);

            if (directions.includes(direction)) {
                return;
            }

            if (this.isDirection({directions, direction})) {
                directions.unshift(direction);
            } else {
                directions.push(direction);
            }

            this.onDirection(true);
        });

        document.addEventListener('keyup', event => {
            const {key, repeat} = event;

            if (!keysMap.has(key)) {
                return;
            }

            if (repeat) {
                return;
            }

            this.onDirection(false);

            directions.splice(directions.indexOf(keysMap.get(key)), 1);

            if (!directions.length) {
                this.onDirection(false);

                return;
            }

            this.onDirection(true);
        });
    }

    onDirection(isHold) {
        const {parser, directions} = this;

        let newDirection;

        for (const direction of directions) {
            if (!newDirection) {
                newDirection = direction;

                continue;
            }

            newDirection = newDirection + '_' + direction;
        }

        parser.onSend(parser.toJson('control', {key: newDirection, isHold}));
    }
}