Ext.define('Fin.model.RecommendationTrend', {
    extend: 'Ext.data.Model',

    idProperty: 'period',

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
        }
    }
})