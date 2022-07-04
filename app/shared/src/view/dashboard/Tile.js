Ext.define('Fin.view.dashboard.Tile', {
    extend: 'Ext.container.Container',

    padding: 20,

    config: {
        record: null
    },

    viewModel: {
        data: {
            record: null
        },
        formulas: {
            data: function(get) {
                var rec = get('record');

                if (!rec) {
                    return {};
                }

                return this.getView().buildData(rec);
            }
        }
    },

    bind: {
        data: '{data}'
    },

    constructor: function() {
        this.callParent(arguments);

        this.addCls('tile');
    },

    buildData: function(record) {
        console.log('override in subclass');
    },

    updateRecord: function(record) {
        this.getViewModel().set('record', record);
    }
});