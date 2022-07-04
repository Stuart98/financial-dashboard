Ext.define('Finn.data.WebSocketStore', {
    extend: 'Ext.Mixin',

    // flag set to true when the websocket is open
    _wsIsOpen: false,

    config: {
        // the symbol to subscribe for
        symbol: ''
    },

    // function used to transform the data returned in each message
    webSocketRecordTransform: Ext.identityFn,

    initWebSocket: function() {
        this.socket = new WebSocket('wss://ws.finnhub.io?token=' + Ext._finnhubApiKey);

        // listen for `open` event
        this.socket.addEventListener('open', Ext.bind(this.onWebSocketOpen, this));

        // Listen for messages
        this.socket.addEventListener('message', Ext.bind(function (event) {
            var transformedData = this.webSocketRecordTransform(Ext.decode(event.data).data);

            console.log('WS Data Received: ', transformedData);

            this.add(transformedData);
        }, this));
    },

    onWebSocketOpen: function() {
        this._wsIsOpen = true;

        this.fireEvent('wsopen', this);
    },

    updateSymbol: function(symbol, oldSymbol) {
        this.unsubscribe(oldSymbol);
        this.subscribe(symbol);
    },

    subscribe: function(symbol) {
        var doSubscribe = function() {
            if (!Ext.isEmpty(symbol)) {
                this.socket.send(JSON.stringify({'type': 'subscribe', 'symbol': symbol}));
            }
        }
        if (this._wsIsOpen) {
            doSubscribe();
        } else {
            this.on('wsopen', doSubscribe, this);
        }
    },

    unsubscribe: function(symbol) {
        if (this._wsIsOpen) {
            this.socket.send(JSON.stringify({'type': 'unsubscribe', 'symbol': symbol}));
        }
    }
})