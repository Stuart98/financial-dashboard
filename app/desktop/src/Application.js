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

		var mainView = Ext.create('Fin.view.main.MainView');
		Ext.Viewport.add(mainView);


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
			
		//dialog.show();
		var record = Ext.create('Finn.model.CompanyProfile', { ticker: 'SHEL' }, null, function(rec) {
			mainView.getViewModel().set('companyRecord', rec);
		});

		window._co = record;
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
