Ext.define('Finn.data.FinnhubProxy', {
    extend: 'Ext.data.proxy.Ajax',

    alias: 'proxy.finnhub',
 
    // the method of the Finnhub client module to call
    finnhubMethod: '',

    // a function that returns an array of parameters to pass to the `finnhubMethod`. The `request` object is passed in
    getFinnhubParams: Ext.emptyFn,

    // a function that is used to extract/process the data returned by the API. The returned data object is passed in
    extractResponse: Ext.emptyFn,
    
    sendRequest: function (request) {
        var me = this;

        // callback for when the promise resolves
        var callback = (error, data, response) => {
            if (request === me.lastRequest) {
                me.lastRequest = null;
            }

            me.processResponse(!error, request.getOperation(), request, response);
        };

        // build the parameter list
        var params = me.getFinnhubParams && me.getFinnhubParams !== Ext.emptyFn ? me.getFinnhubParams(request) : null;
        
        // if none present then default to passing in the symbol as an object
        if (!params) {
            params = [{
                symbol: request.getParams()[me.getIdParam()]
            }];
        }

        // add the callback function to the parameter set
        params.push(callback);

        // call the finnhub module
        Ext._finnhubClient[me.finnhubMethod].apply(Ext._finnhubClient, params);
        
        this.lastRequest = request;
        
        return request;
    },

    // process the response data
    extractResponseData: function(data){
        return this.extractResponse ? this.extractResponse(data) : data.body;
    }
})