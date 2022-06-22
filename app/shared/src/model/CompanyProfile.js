Ext.define('Finn.model.CompanyProfile', {
    extend: 'Ext.data.Model',

    idProperty: 'ticker',

    fields: [
        'country',
        'currency',
        'exchange',
        'ipo',
        'marketCapitalization',
        'name',
        'phone',
        'shareOutstanding',
        'ticker',
        'weburl',
        'logo',
        'finnhubIndustry'
    ],

    proxy: {
        type: 'finnhub',
        finnhubMethod: 'companyProfile2',
        idParam: 'ticker'
    },

    hasOne: [
        {
            model: 'Fin.model.BasicFinancials',
            name: 'basicFinancials'
        }
    ],

    hasMany: [
        {
            model: 'Fin.model.StockCandle',
            name: 'stockCandles'
        },
        {
            model: 'Fin.model.Earning',
            name: 'earningsCalendar'
        },
        {
            model: 'Fin.model.RecommendationTrend',
            name: 'recommendationTrends'
        },
        {
            model: 'Fin.model.Trade',
            storeConfig: {
                type: 'Trades'
            },
            name: 'trades'
        }
    ],

    constructor: function() {
        this.callParent(arguments);

        this.load();
        
        this.setBasicFinancials(Fin.model.BasicFinancials.load(this.getId()));

        this.earningsCalendar().getProxy().setExtraParams({
            symbol: this.getId()
        });
        this.stockCandles().getProxy().setExtraParams({
            symbol: this.getId()
        });
        this.recommendationTrends().getProxy().setExtraParams({
            symbol: this.getId()
        });


        this.earningsCalendar().load();
        this.stockCandles().load();
        this.recommendationTrends().load();
        this.trades().setSymbol(this.getId());
        this.trades().initWebSocket();
    }
}, function(cls) {
    
})