Ext.define('Finn.model.CompanyProfile', {
    extend: 'Ext.data.Model',

    requires: [
        'Fin.util.Formatter',
        'Ext.data.identifier.Uuid'
    ],

    identifier: 'uuid',

    fields: [
        'country',
        'currency',
        'exchange',
        'ipo',
        {
            name: 'marketCapitalization',
            // convert to dollars
            convert: function(val) {
                return val * 1000000;
            }
        },
        {
            name: 'marketCap',
            calculate: function(data) {
                return Fin.util.Formatter.numberFormat(data.marketCapitalization, 3);
            }
        },
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

    constructor: function(data, session, onLoadCallback) {
        var me = this;
        this.callParent(arguments);

        Promise.all([
            new Promise((resolve) => {
                me.load(this.get('ticker'), {
                    callback: resolve
                });
            }),
            new Promise(function(resolve) {
                Fin.model.BasicFinancials.load(me.get('ticker'), {
                    callback: resolve
                })
            })
        ]).then((loadRecords) => {
            me.setBasicFinancials(loadRecords[1]);

            this.earningsCalendar().getProxy().setExtraParams({
                symbol: this.get('ticker')
            });
            this.stockCandles().getProxy().setExtraParams({
                symbol: this.get('ticker')
            });
            this.recommendationTrends().getProxy().setExtraParams({
                symbol: this.get('ticker')
            });


            this.earningsCalendar().load();
            this.stockCandles().load();
            this.recommendationTrends().load();
            this.trades().setSymbol(this.get('ticker'));
            this.trades().initWebSocket();

            onLoadCallback(me);
        });
        
    }
});