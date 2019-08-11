const Parser = require('./Parser');
const PixiApp = require('./PixiApp');
const Control = require('./Control');
const Objects = require('./Objects');

module.exports = class GameClient {
    constructor(host, port, nickname) {
        this.client = new WebSocket(`ws://${host}:${port}/`);

        const resolution = {width: 1600, height: 900};

        const objects = Objects.getInstance();
        objects.setData({nickname, resolution});

        this.pixiApp = new PixiApp(resolution);

        this.parser = new Parser(this.pixiApp);
        this.parser.setClient(this.client);
    }

    start() {
        new Control(this.parser);

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
            console.log(message.data);
            this.parser.work(message.data);
        };

        this.client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
    }
}
