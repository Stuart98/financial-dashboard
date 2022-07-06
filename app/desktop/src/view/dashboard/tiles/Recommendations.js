Ext.define('Fin.view.dashboard.tiles.Recommendations', {
    extend: 'Fin.view.dashboard.Tile',

    alias: 'widget.dashboard-tiles-Recommendations',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Bar',
        'Ext.chart.interactions.ItemHighlight'
    ],

    layout: 'fit',
    items: [
        {
            xtype: 'cartesian',
            captions: {
                title: 'Recommendation Trends'
            },

            legend: {
                type: 'sprite',
                docked: 'right'
            },

            axes: [
                {
                    type: 'numeric',
                    position: 'left',
                    grid: true,
                    fields: ['strongSell', 'sell', 'hold', 'buy', 'strongBuy'],
                    minimum: 0
                },
                {
                    type: 'category',
                    position: 'bottom',
                    grid: true,
                    fields: 'period',
                    label: {
                        rotate: {
                            degrees: -45
                        }
                    }
                }
            ],
            series: [
                {
                    type: 'bar',
                    title: ['Strong Sell', 'Sell', 'Hold', 'Buy', 'Strong Buy'],
                    xField: 'period',
                    yField: ['strongSell', 'sell', 'hold', 'buy', 'strongBuy'],
                    stacked: true,
                    highlight: {
                        opacity: 0.5
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: function(tooltip, record, item) {
                            var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                                title = item.series.getTitle()[fieldIndex];
                    
                            tooltip.setHtml(title + ' (' + record.get(item.field) + ')');
                        }
                    }
                }
            ]
        }
    ],

    updateRecord: function(record) {
        this.callParent(arguments);

        var store = record ? record.recommendationTrends() : null;

        this.getChart().setStore(store);
    },

    getChart: function() {
        return this.down('chart');
    }
});