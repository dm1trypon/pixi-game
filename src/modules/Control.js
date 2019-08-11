const Framer = require('./Framer');
const Objects = require('./Objects');

module.exports = class Control {
    constructor(parser) {
        this.parser = parser;
        this.keysMap = new Map();
        this.directions = [];
        this.isPressed = false;
        this.interval = null;
        this.mousePos = {posX: null, posY: null};
        this.objects = Objects.getInstance();
        
        this.setKeys();
        this.setEvents();

        new Framer(parser, this);
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
        const camera = this.objects.getCamera;
        const {parser, directions, keysMap} = this;

        document.addEventListener('mousedown', () => {
            this.isPressed = true;
        });

        document.addEventListener('mouseup', event => {
            this.isPressed = false;
            
            const {layerX: posX, layerY: posY} = event;
            const {ofPosX, ofPosY} = camera.setCursor({posX, posY});

            this.mousePos = {posX, posY};

            parser.onSend(parser.toJson('cursor', {posX: posX + 50, posY: posY + 50, offsetX: ofPosX + 50, offsetY: ofPosY + 50, isShot: this.isPressed}));
        });

        document.addEventListener('mousemove', event => {
            const {layerX: posX, layerY: posY} = event;
            const {ofPosX, ofPosY} = camera.setCursor({posX, posY});

            this.mousePos = {posX, posY};

            if (this.isPressed) {
                return;
            }

            parser.onSend(parser.toJson('cursor', {posX: posX + 50, posY: posY + 50, offsetX: ofPosX + 50, offsetY: ofPosY + 50, isShot: this.isPressed}));
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