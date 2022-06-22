Ext.define('Fin.model.RecommendationTrend', {
    extend: 'Ext.data.Model',

    idProperty: 'symbol',

    fields: [

    ],

    proxy: {
        type: 'finnhub',
        finnhubMethod: 'recommendationTrends',
        idParam: 'symbol',
        getFinnhubParams: function(request) {
            return [
                request.getParams()[this.getIdParam()]
            ];
        },
        xextractResponse: function(data) {
            return data.body.earningsCalendar;
        }
    }
})