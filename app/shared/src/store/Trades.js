Ext.define('Finn.store.Trades', {
    extend: 'Ext.data.Store',

    alias: 'store.Trades',

    mixins: [
        'Finn.data.WebSocketStore'
    ],

    model: 'Fin.model.Trade',

    // turn the received data object into a more friendly format
    webSocketRecordTransform: function(data) {
        data = Ext.isArray(data) ? data : [data];

        return Ext.Array.map(Ext.Array.clean(data), function(d) {
            return {
                symbol: d.s,
                price: d.p,
                date: Ext.Date.parse(d.t, 'time'),
                volume: d.v,
                tradeConditions: d.c
            };
        })
    }
})