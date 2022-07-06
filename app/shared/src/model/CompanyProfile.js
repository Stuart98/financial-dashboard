Ext.define('Fin.model.CompanyProfile', {
    extend: 'Ext.data.Model',

    requires: [
        'Fin.util.Formatter'
    ],

    idProperty: 'ticker',

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

    statics: {
        loadCompany: function(symbol, onLoadCallback) {
            // load the two single models in parallel and wait until they're finished. then
            // load all the stores which can come in after
            Promise.all([
                new Promise((resolve) => {
                    Fin.model.CompanyProfile.load(symbol, {
                        callback: resolve
                    });
                }),
                new Promise((resolve) => {
                    Fin.model.BasicFinancials.load(symbol, {
                        callback: resolve
                    })
                })
            ]).then((loadedRecords) => {
                var record = loadedRecords[0];

                record.setBasicFinancials(loadedRecords[1]);
    
                record.earningsCalendar().getProxy().setExtraParams({
                    symbol: record.getId()
                });
                record.stockCandles().getProxy().setExtraParams({
                    symbol: record.getId()
                });
                record.recommendationTrends().getProxy().setExtraParams({
                    symbol: record.getId()
                });
    
    
                record.earningsCalendar().load();
                record.stockCandles().load();
                record.recommendationTrends().load();
                record.trades().setSymbol(record.getId());
                record.trades().initWebSocket();
    
                record.trades().on('datachanged', record.onTradesDataChanged, record);
    
                onLoadCallback(record);
            });
        }
    },

    onTradesDataChanged: function() {
        // get the current price and the latest price from the end of the `trades` store
        var currentPrice = this.getBasicFinancials().get('latestPrice') || 0;
        var latestPrice = Math.round(this.trades().last().get('price') * 100) / 100;

        this.getBasicFinancials().set('latestPrice', latestPrice);
        this.getBasicFinancials().set('latestPriceDate', this.trades().last().get('date'));
        this.getBasicFinancials().set('latestPriceDirection', latestPrice > currentPrice ? 1 : latestPrice < currentPrice ? -1 : 0);
    }
});