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
                'price' // metric
            ];
        },
        extractResponse: function(data) {
            return data.body.metric;
        }
    }
})