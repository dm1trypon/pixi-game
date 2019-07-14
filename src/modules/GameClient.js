const WebSocketClient = require('websocket').client;
const Parser = require('./Parser');

module.exports = class GameClient {
    constructor(host, port, nickname) {
        this.client = new WebSocketClient();
        this.client.connect(`ws://${host}:${port}/`);

        this.parser = new Parser(nickname);

        this.start();
    }

    start() {
        this.client.on('connectFailed', (error) => {
            console.log('Connect Error: ' + error.toString());
        });
         
        this.client.on('connect', (connection) => {
            this.parser.setConnection(connection);

            console.log('WebSocket Client Connected');
        
            connection.on('error', (error) => {
                console.log("Connection Error: " + error.toString());
            });
        
            connection.on('close', () => {
                console.log('WebSocket closed!');
            });
        
            connection.on('message', (message) => {
                if (message.type !== 'utf8') {
                    return;
                }
        
                console.log("Received: '" + message.utf8Data + "'");

                this.parser.work(message.utf8Data);
            });
        });
    }
}
