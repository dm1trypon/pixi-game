const PIXI = require('pixi.js');

module.exports = class TextInput {
    constructor(dataContent, style, parent) {
        this.dataContent = dataContent;
        this.parent = parent;

        const {fontSize} = style;

        this.style = style;

        const {text, width} = dataContent;

        this.text = text;
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = fontSize;
        this.backgroundColor = 0x000000;
        this.borderColor = 0x123132;
        this.borderDepth = 0;
        this.isClicked = false;
        this.app = parent.app;
        this.mainContainer = parent.mainContainer;
        this.menuBlock = null;
        this.pixiText = null;

    }

    create() {
        const {style, x, y, backgroundColor, borderColor, borderDepth, width, height, text} = this;

        this.menuBlock = new PIXI.Graphics();

        this.menuBlock.beginFill(backgroundColor);
        this.menuBlock.interactive = true;
        this.menuBlock.lineStyle(borderDepth, borderColor);
        this.menuBlock.drawRect(x, y, width, height);

        this.pixiText = new PIXI.Text(text, style);

        this.pixiText.interactive = true;

        this.pixiText.x = x;
        this.pixiText.y = y;

        this.setEvents();

        this.mainContainer.addChild(this.menuBlock);
        this.mainContainer.addChild(this.pixiText);

        return {textInput: {menuBlock: this.menuBlock, pixiText: this.pixiText}};
    }

    remove() {
        this.mainContainer.removeChild(this.menuBlock);
        this.mainContainer.removeChild(this.pixiText);
    }

    setEvents() {
        this.pixiText.on('click', () => {
            this.isClicked = true;
        });

        const {fontSize} = this.style;

        document.addEventListener('keydown', event => {
            if (!this.isClicked) {
                return;
            }

            const {key} = event;

            if (key == 'Enter') {
                this.parent.onStart(this.pixiText.text);

                return;
            }

            if (key == 'Backspace') {
                this.pixiText.text = this.pixiText.text.slice(0, -1);

                return;
            }

            if (this.pixiText.width > this.menuBlock.width - fontSize) {
                return;
            }

            if (key.length > 1) {
                return;
            }

            this.pixiText.text += key;
        });
    }
}