module.exports = class Control {
    constructor(parser) {
        this.parser = parser;
        this.keysMap = new Map();

        this.setKeys();
        this.setEvents();
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

    setEvents() {
        document.addEventListener('keyup', event => {
            if (!this.keysMap.has(event.key)) {
                return;
            }

            if (event.repeat) {
                return;
            }

            this.parser.onSend(this.parser.toJson('control', {key: this.keysMap.get(event.key), isHold: false}));
            console.log(`Key "${event.key}" released  [event: keyup]`);
        });

        document.addEventListener('keydown', event => {
            if (!this.keysMap.has(event.key)) {
                return;
            }

            if (event.repeat) {
                return;
            }

            this.parser.onSend(this.parser.toJson('control', {key: this.keysMap.get(event.key), isHold: true}));
            console.log(`Key "${event.key}" released  [event: keydown]`);
        });
    }
}