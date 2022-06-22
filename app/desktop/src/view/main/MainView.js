Ext.define('Fin.view.main.MainView', {
    extend: 'Ext.Container',
    xtype: 'mainview',
    controller: 'mainviewcontroller',
    viewModel: {
        type: 'mainviewmodel'
    },
    requires: [
    'Ext.layout.Fit'
    ],
    layout: 'fit',
    items: [
        { xtype: 'headerview', reference: 'headerview', docked: 'top',    bind: {height: '{headerview_height}'} },
        { xtype: 'centerview', reference: 'centerview' }
    ]
});
