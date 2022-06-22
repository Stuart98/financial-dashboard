Ext.define('Fin.model.StockCandle', {
    extend: 'Ext.data.Model',

    idProperty: 'symbol',

    fields: [

    ],

    proxy: {
        type: 'finnhub',
        finnhubMethod: 'stockCandles',
        idParam: 'symbol',
        getFinnhubParams: function(request) {
            return [
                request.getParams()[this.getIdParam()],
                'M',
                Ext.Date.add(new Date(), Ext.Date.YEAR, -1).getTime(),
                (new Date()).getTime(),
            ];
        },
        extractResponse: function(data) {
            return data.body;
        }
    }
})