Ext.define('Fin.view.main.header.HeaderView', {
    extend: 'Ext.Toolbar',
    xtype: 'headerview',
    cls: 'headerview',
    viewModel: {},
    items: [
        { 
            xtype: 'container',
            cls: 'headerviewtext',
            bind: { html: '{heading}' }
        }
    ]
});
