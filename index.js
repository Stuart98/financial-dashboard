//this file exists so the webpack build process will succeed
Ext._finnhub = require('finnhub');
Ext._finnhubApiKey = 'capdc7aad3iahju4gbvg';


// set up Finnhub API module
const api_key = Ext._finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = Ext._finnhubApiKey;
Ext._finnhubClient = new Ext._finnhub.DefaultApi();
