Ext.define('Fin.model.Trade', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.identifier.Uuid'
    ],

    identifier: 'uuid',
    fields: [
        'symbol',
        'price',
        'date',
        'volume',
        'tradeConditions'
    ]
})