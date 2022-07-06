Ext.define('Fin.view.dashboard.tiles.FinancialStats', {
    extend: 'Fin.view.dashboard.Tile',

    alias: 'widget.dashboard-tiles-FinancialStats',

    tpl: [
        '<div class="row full-height">',
        '   <div class="col">',
        '       <span class="value-large">',
        '           ${latestPrice} ',
        '           <span class="delta <tpl if="latestPriceDirection === 1">up<tpl elseif="latestPriceDirection === -1">down<tpl else>same</tpl>">▲</span>',
        '       </span>',
        '       <span class="label-large">Latest Trade Price</span>',
        '       <span class="label">{latestPriceDate:date("d-m-Y h:i:s")}</span>',
        '   </div>',
        '   <div class="col">',
        '       <span class="value-large">${52WeekHigh}</span>',
        '       <span class="label-large">52 Week High</span>',
        '   </div>',
        '   <div class="col">',
        '       <span class="value-large">${52WeekLow}</span>',
        '       <span class="label-large">52 Week Low</span>',
        '   </div>',
        '   <div class="col">',
        '       <span class="value-large">{netProfitMarginTTM:round(0)}%</span>',
        '       <span class="label-large">Net Profit Margin</span>',
        '   </div>',
        '   <div class="col">',
        '       <span class="value-large">{revenueGrowthTTMYoy:round(0)}%</span>',
        '       <span class="label-large">Revenue Growth YoY</span>',
        '   </div>',
        '</div>',
    ],

    applyRecord: function(rec) {
        return rec ? rec.getBasicFinancials() : rec;
    },

    bind: {
        data: {
            '52WeekHigh': '{record.52WeekHigh}',
            '52WeekLow': '{record.52WeekLow}',
            'netProfitMarginTTM': '{record.netProfitMarginTTM}',
            'revenueGrowthTTMYoy': '{record.revenueGrowthTTMYoy}',
            'latestPrice': '{record.latestPrice}',
            'latestPriceDate': '{record.latestPriceDate}',
            'latestPriceDirection': '{record.latestPriceDirection}'
        }
    }
});