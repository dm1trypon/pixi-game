const uuidv4 = require('uuid/v4');

module.exports = class Ping {
    constructor(client, parser) {
        this.client = client;
        this.parser = parser;
        this.date = null;
        this.pingId = null;
    }

    start() {
        const {parser, client} = this;

        this.pingId = uuidv4();

        client.send(parser.toJson('ping', {pingId: this.pingId}));

        this.date = Date.now();
    }

    stop(pingId) {
        const {date, parser} = this;

        if (pingId !== this.pingId) {
            console.log(`Ping id ${this.pingId} failed!`);

            return;
        }

        const difference = Date.now() - date;

        console.log(`Ping: ${difference} ms`);

        parser.onPing(difference);
    }
}