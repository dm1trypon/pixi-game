const Parser = require('./Parser');
const PixiApp = require('./PixiApp');
const Control = require('./Control');

module.exports = class GameClient {
    constructor(host, port, nickname) {
        this.client = new WebSocket(`ws://${host}:${port}/`);
        this.pixiApp = new PixiApp();
        this.parser = new Parser(nickname, this.pixiApp);
        this.control = new Control(this.parser);
        this.parser.setClient(this.client);

        this.start();
    }

    start() {
        this.client.onerror = error => {
            console.log(`Connect Error: ${error.toString()}`);
        };
         
        this.client.onclose = (event) => {
            if (event.wasClean) {
                console.log('WebSocket closed clearly');
            } else {
                console.log('WebSocket closed failury');
            }

            console.log(`Code: ${event.code} Reason: ${event.reason}`);
        };

        this.client.onmessage = message => {
            this.parser.work(message.data);
        };

        this.client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
    }
}
