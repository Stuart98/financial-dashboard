Ext.define('Fin.view.dashboard.tiles.CompanyInfo', {
    extend: 'Fin.view.dashboard.Tile',

    alias: 'widget.dashboard-tiles-CompanyInfo',
    
    tpl: [
        '<div class="row">',
        '   <img src="{logo}" alt="" />',
        '   <h4>{name} <span>({ticker})</span></h4>',
        '</div>',
        '<div class="row">',
        '   <span class="label">Market Cap:</span><span class="value">${marketCap}</span>',
        '</div>',
        '<div class="row">',
        '   <span class="label">Country:</span><span class="value">{country}</span>',
        '</div>',
        '<div class="row">',
        '   <span class="label">Exchange:</span><span class="value">{exchange}</span>',
        '</div>'
    ],

    bind: {
        data: {
            name: '{record.name}',
            ticker: '{record.ticker}',
            logo: '{record.logo}',
            marketCap: '{record.marketCap}',
            country: '{record.country}',
            exchange: '{record.exchange}',
        }
    }
});