Ext.define('Fin.view.CompanySearch', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.CompanySearch',

    requires: [
        'Ext.dataview.List'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    viewModel: {
        data: {
            search: '',
            selection: null
        },

        stores: {
            results: {
                fields: ['name']
            }
        }
    },

    padding: 20,

    items: [
        {
            xtype: 'textfield',
            label: '',
            margin: '0 0 30',
            placeholder: 'Search for company name...',
            bind: {
                value: '{search}'
            }
        },
        {
            xtype: 'list',
            itemId: 'resultsGrid',
            flex: 1,
            border: true,
            itemTpl: '<div class="item"><strong>{description}</strong><div>{symbol}</div></div>',
            bind: {
                store: '{results}',
                selection: '{selection}'
            }
        }
    ],

    constructor: function() {
        this.callParent(arguments);

        this.grid = this.down('#resultsGrid');

        this.getViewModel().bind('{search}', this.onSearchChange, this);
        this.getViewModel().bind('{selection}', this.onSelectionChange, this)
    },

    onSearchChange: Ext.Function.createBuffered(function(val, oldVal) {
        if (Ext.isEmpty(val)) {
            this.getViewModel().getStore('results').removeAll();
            return;
        }

        this.grid.setMasked({
            xtype: 'loadmask'
        });

        Ext._finnhubClient.symbolSearch(val, (error, data, response) => {
            this.getViewModel().getStore('results').removeAll();
            this.getViewModel().getStore('results').add(data.result);

            this.grid.setMasked(false);
        });
    }, 250),

    onSelectionChange: function(selection) {
        if (selection) {
            this.fireEvent('select', selection.get('symbol'));
        }
    }
})