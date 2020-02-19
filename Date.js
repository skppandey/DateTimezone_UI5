sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("Date.DatePicker.controller.Date", {
		onInit: function () {

		},

		onAfterRendering: function () {
	//		var d = this.getView().byId("sPicker").getDateValue();
			var dateId = this.getView().byId("sPicker");
			var oModel = this.getOwnerComponent().getModel();
			var json = new sap.ui.model.json.JSONModel();
			oModel.read("/get_dateSet", {

				method: "GET",

				success: function (oData, oResponse) {
					var value = oData.results[0].DATE;
				//	var val1 = new Date(value.getTime() + new Date(0).getTimezoneOffset() * 60 * 1000);
					var data = {};
					data.syDate = value;
					json.setData(data);
					this.getView().setModel(json, "coreModel");
					
					//	dateId.setDateValue(val1);
					debugger
				}.bind(this),
				error: function (oError) {
					debugger
				}
			});

		},

		onSave: function () {
			debugger
			//	var t = d.setUTCDate(d.getDate());
			//	var send = new Date(t);
				//	oEntity.DATE = send;

			// var oModel = this.getOwnerComponent().getModel();
			// var d = this.getView().byId("sPicker").getDateValue();
			// var syFormat = sap.ui.core.format.DateFormat.getDateInstance({
			// 	pattern: "yyyy-MM-ddTHH:mm:ss",
			// 	UTC : true
			// });
			// var f = syFormat.format(d);
			var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-ddTKK:mm:ss" });

			var lv_date_val = new Date(this.getView().byId("sPicker").getValue());

			var dateStr = dateFormat.format(lv_date_val);

			var oEntity = {};
	
			oEntity.DATE = dateStr;
			var oModel = this.getOwnerComponent().getModel();

			oModel.create("/get_dateSet", oEntity, {

				method: "POST",
				success: function (oData, oResponse) {

					debugger
				},
				error: function (oError) {
					debugger
				}
			});

		}
	});
});
