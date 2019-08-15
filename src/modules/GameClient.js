const Parser = require('./Parser');
const PixiApp = require('./PixiApp');
const Control = require('./Control');
const Objects = require('./Objects');
const Ping = require('./Ping');
const CronJob = require('cron').CronJob;

module.exports = class GameClient {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.client = null;

        const resolution = {width: 1600, height: 900};

        const objects = Objects.getInstance();
        objects.setData({nickname: '', resolution});

        this.pixiApp = new PixiApp(resolution, this);
        this.ping = null;

        this.parser = null;
    }

    enterGame() {
        this.pixiApp.addMenu();
    }

    onRecievedPing(pingId) {
        this.ping.stop(pingId);
    }

    start() {
        const {host, port} = this;

        this.client = new WebSocket(`ws://${host}:${port}/`);
        
        this.parser = new Parser(this.pixiApp);
        this.parser.setClient(this.client);

        this.ping = new Ping(this.client, this.parser);

        this.startCron();

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
            this.parser.work(message.data);
        };

        this.client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
    }

    startCron() {
        new CronJob('* * * * * *', () => {
            this.ping.start();
        }, null, true, 'America/Los_Angeles');
    }
}
