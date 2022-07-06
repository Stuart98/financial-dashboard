Ext.define('Fin.view.dashboard.tiles.PriceHistory', {
    extend: 'Fin.view.dashboard.Tile',

    alias: 'widget.dashboard-tiles-PriceHistory',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.ItemHighlight'
    ],

    layout: 'fit',
    items: [
        {
            xtype: 'cartesian',
            captions: {
                title: 'Live Price History'
            },
            
            axes: [
                {
                    type: 'numeric',
                    position: 'left',
                    grid: true,
                    fields: ['price'],
                    minimum: 0
                },
                {
                    type: 'category',
                    position: 'bottom',
                    grid: true,
                    fields: 'date',
                    renderer: function(axis, data){
                        return Ext.Date.format(data, 'H:i:s')
                    },
                    label: {
                        rotate: {
                            degrees: -90
                        }
                    }
                }
            ],
            series: [
                {
                    type: 'line',
                    xField: 'date',
                    yField: 'price',
                    marker: {
                        type: 'circle'
                    },
                    highlightCfg: {
                        scaling: 2
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: function(tooltip, record, item) {
                            tooltip.setHtml('$' + record.get('price') + ' (' + record.get('volume') +')');
                        }
                    }
                }
            ]
        }
    ],

    updateRecord: function(record) {
        this.callParent(arguments);

        var store = record ? record.trades() : null;

        this.getChart().setStore(store);
    },

    getChart: function() {
        return this.down('chart');
    }
});