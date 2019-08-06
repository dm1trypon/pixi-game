module.exports = class Control {
    constructor(parser) {
        this.parser = parser;
        this.keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'w', 'a', 's', 'd'];

        this.setEvents();
    }

    setEvents() {
        document.addEventListener('keyup', event => {
            if (!this.keys.includes(event.key)) {
                return;
            }

            if (event.repeat) {
                return;
            }

            this.parser.toJson();
            this.parser.onSend(this.parser.toJson('control', {key: event.key, isHold: true,}));
            console.log(`Key "${event.key}" released  [event: keyup]`);
        });

        document.addEventListener('keydown', event => {
            if (!this.keys.includes(event.key)) {
                return;
            }

            if (event.repeat) {
                return;
            }

            this.parser.onSend(this.parser.toJson('control', {key: event.key, isHold: false,}));
            console.log(`Key "${event.key}" released  [event: keydown]`);
        });
    }
}