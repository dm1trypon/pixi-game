const PIXI = require('pixi.js');

module.exports = class TextInput {
    constructor(text, style, app) {
        this.text = text;
        this.isClicked = false;
        this.style = style;
        this.app = app;
    }

    create() {
        console.log(this.style);

        const textInput = new PIXI.Text(this.text, this.style);

        textInput.interactive = true;

        this.setEvents(textInput);

        return textInput;
    }

    setEvents(textInput) {
        textInput.on('click', () => {
            this.isClicked = true;
            console.log('CLICK!');
        });

        this.app.on('click', () => {
            this.isClicked = false;
            console.log('OUTCLICK!');
        });

        document.addEventListener('keydown', event => {
            if (!this.isClicked) {
                return;
            }

            const {key} = event;

            if (key == 'Backspace') {
                textInput.text = textInput.text.slice(0, -1);

                return;
            }

            textInput.text += key;
        });
    }
}