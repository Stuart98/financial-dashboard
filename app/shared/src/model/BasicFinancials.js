Ext.define('Fin.model.BasicFinancials', {
    extend: 'Ext.data.Model',

    idProperty: 'symbol',

    fields: [

    ],

    proxy: {
        type: 'finnhub',
        idParam: 'symbol',
        finnhubMethod: 'companyBasicFinancials',
        getFinnhubParams: function(request) {
            return [
                request.getParams()[this.getIdParam()], // get ID
                'all' // metric
            ];
        }
    }
})