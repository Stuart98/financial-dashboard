Ext.define('Fin.view.dashboard.tiles.FinancialStats', {
    extend: 'Fin.view.dashboard.Tile',

    alias: 'widget.dashboard-tiles-FinancialStats',

    tpl: [
        '<div class="row full-height">',
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

    buildData: function(record) {
        var basicFinRec = record.getBasicFinancials();

        return {
            '52WeekHigh': basicFinRec.get('52WeekHigh'),
            '52WeekLow': basicFinRec.get('52WeekLow'),
            'netProfitMarginTTM': basicFinRec.get('netProfitMarginTTM'),
            'revenueGrowthTTMYoy': basicFinRec.get('revenueGrowthTTMYoy')
        }
    }
});