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



		var dialog = Ext.create({
			xtype: 'dialog',
			header: false,
			layout: 'fit',
			width: 400,
			height: 500,
			items: [
				{
					xclass: 'Fin.view.CompanySearch',
					listeners: {
						select: function(symbol) {
					
							Fin.model.CompanyProfile.loadCompany(symbol, function(rec) {
								var mainView = Ext.create('Fin.view.main.MainView');
								Ext.Viewport.add(mainView);
								
								mainView.getViewModel().set('companyRecord', rec);

								dialog.close();
							});
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
