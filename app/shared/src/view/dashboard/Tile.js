Ext.define('Fin.view.dashboard.Tile', {
    extend: 'Ext.container.Container',

    padding: 20,

    config: {
        record: null
    },

    viewModel: {
        data: {
            record: null
        }
    },

    data: {},

    constructor: function() {
        this.callParent(arguments);

        this.addCls('tile');
    },

    updateRecord: function(record) {
        this.getViewModel().set('record', record);
    }
});