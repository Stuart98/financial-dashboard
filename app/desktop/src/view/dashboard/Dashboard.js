Ext.define('Fin.view.dashboard.Dashboard', {
    extend: 'Ext.container.Container',

    alias: 'widget.Dashboard',

    requires: [
        'Fin.view.dashboard.tiles.CompanyInfo',
        'Fin.view.dashboard.tiles.FinancialStats'
    ],

    cls: 'dashboard',

    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'dashboard-tiles-CompanyInfo',
                    bind: {
                        record: '{companyRecord}'
                    }
                },
                {
                    xtype: 'dashboard-tiles-FinancialStats',
                    flex: 1,
                    bind: {
                        record: '{companyRecord}'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            height: 400,
            items: [
                {
                    xtype: 'dashboard-tiles-Recommendations',
                    flex: 1,
                    bind: {
                        record: '{companyRecord}'
                    }
                },
                { xtype: 'component', flex: 2 }
            ]
        }
    ]
});