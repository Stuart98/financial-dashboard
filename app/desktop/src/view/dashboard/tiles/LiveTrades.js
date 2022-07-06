Ext.define('Fin.view.dashboard.tiles.LiveTrades', {
    extend: 'Fin.view.dashboard.Tile',

    alias: 'widget.dashboard-tiles-LiveTrades',

    layout: 'fit',
    items: [
        {
            xtype: 'component',
            cls: 'title',
            html: 'Live Trades',
            padding: '30 20 0 20',
            docked: 'top'
        },
        {
            xtype: 'list',
            border: true,
            deferEmptyText: false,
            emptyText: 'No Live Trades yet',
            itemTpl: [
                '<div class="item">',
                '   <strong>£{price} ({volume})</strong>',
                '   <div>{date:date("d-m-Y H:i:s")}</div>',
                '</div>'
            ].join('')
        }
    ],

    updateRecord: function(record) {
        this.callParent(arguments);

        var store = record ? record.trades() : null;

        var chainedStore = Ext.create('Ext.data.ChainedStore', {
            source: store,
            sorters: [
                {
                    property: 'date',
                    direction: 'desc'
                }
            ]
        });

        this.getList().setStore(chainedStore);
    },

    getList: function() {
        return this.down('list');
    }
});