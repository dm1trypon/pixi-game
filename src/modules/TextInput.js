const PIXI = require('pixi.js');

module.exports = class TextInput {
    constructor(text, style) {
        this.text = text;
        this.isClicked = false;
        this.style = style;
    }

    create() {
        console.log(this.style);

        const textInput = new PIXI.Text('', this.style);

        this.setEvents(textInput);

        return textInput;
    }

    setEvents(textInput) {
        textInput.on('click', event => {
            this.isClicked = true;
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