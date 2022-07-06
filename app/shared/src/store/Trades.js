Ext.define('Fin.store.Trades', {
    extend: 'Ext.data.Store',

    alias: 'store.Trades',

    mixins: [
        'Fin.data.WebSocketStore'
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
        })[0]; // just take the first in the set so we have one per time stamp. obviously, this isn't good - just for demo simplicity
    }
})