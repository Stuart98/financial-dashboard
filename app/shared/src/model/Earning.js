Ext.define('Fin.model.Earning', {
    extend: 'Ext.data.Model',

    idProperty: 'symbol',

    fields: [
        { name: 'date', dateFormat: 'Y-m-d' },
        'epsActual',
        'epsEstimate',
        'hour',
        'quarter',
        'revenueActual',
        'revenueEstimate',
        'symbol',
        'year',
    ],

    proxy: {
        type: 'finnhub',
        finnhubMethod: 'earningsCalendar',
        idParam: 'symbol',
        getFinnhubParams: function(request) {
            return [
                {
                    symbol: request.getParams()[this.getIdParam()],
                    from: Ext.Date.add(new Date(), Ext.Date.WEEK, -1).getTime(),
                    to: (new Date()).getTime()
                }
            ];
        },
        extractResponse: function(data) {
            return data.body.earningsCalendar;
        }
    }
})