Ext.define('Fin.Application', {
	extend: 'Ext.app.Application',
	name: 'Fin',
	requires: ['Fin.*'],

	removeSplash: function () {
		Ext.getBody().removeCls('launching')
		var elem = document.getElementById("splash")
		elem.parentNode.removeChild(elem)
	},

	launch: function () {
		this.removeSplash()
		var whichView = 'mainview'
		Ext.Viewport.add([{xtype: whichView}])


		var dialog = Ext.create({
			xtype: 'dialog',
			header: false,
			layout: 'fit',
			width: 400,
			height: 500,
			items: [
				{
					xclass: 'Finn.view.CompanySearch',
					listeners: {
						select: function(symbol) {
							window._co = Ext.create('Finn.model.CompanyProfile', { ticker: symbol });

							dialog.close();
						}
					}
				}
			]
		});
			
		dialog.show();
	},

	onAppUpdate: function () {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			function (choice) {
				if (choice === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
