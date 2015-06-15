(function($, undefined) {
	$.widget("mobile.date", {
		options: {
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: false,
			hideIfNoPrevNext: false,
			navigationAsDateFormat: false,
			gotoCurrent: false,
			changeMonth: false,
			changeYear: false,
			dateFormat: 'd MM yy',
			yearRange: "c-10:c+10",
			showOtherMonths: false,
			selectOtherMonths: false,
			showWeek: false,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			beforeShowDay: null,
			onSelect: function(text, object) {
				var self = this;
				setTimeout(function() {
					if (!object.settings.inline) {
						$(object.input).date("addMobileStyle");
					} else {
						$(object.settings.altField).date("addMobileStyle")
					}
					var ts = toTimestamp(object.currentDay, object.currentMonth, object.currentYear);
					$(object.input).data('value', ts).next().val(convertTimestamp(ts, 'save')).trigger('change');
				}, 0);
			},
			onChangeMonthYear: function(month, year, object) {
				var self = this;
				setTimeout(function() {
					if (!object.settings.inline) {
						$(object.input).date("addMobileStyle");
					} else {
						$(object.settings.altField).date("addMobileStyle");
					}
				}, 0);
			},
			beforeShow: function(element) {
				var self = this;
				setTimeout(function() {
					$(element).data("mobileDate").addMobileStyle();
				}, 0);
			},
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: true,
			showButtonPanel: false,
			autoSize: false,
			disabled: false,
			inline: false
		},
		_create: function() {
			var calendar, interval,
				that = this;
			if (this.options.inline) {
				this.options.altField = this.element;
				calendar = $("<div>").datepicker(this.options);
				this.element.parent().after(calendar);
			} else {
				this.element.datepicker(this.options);
				calendar = this.element.datepicker("widget");
			}
			this.calendar = calendar;
			this.baseWidget = (!this.options.inline) ? this.element : this.calendar;
			this._on({
				"change": function() {
					if (this.options.inline) {
						this.calendar.datepicker("setDate", this.element.val());
					}
					this._delay("addMobileStyle", 10);
				},
				"input": function() {
					interval = window.setInterval(function() {
						if (!that.calendar.hasClass("mobile-enhanced")) {
							that.addMobileStyle();
						} else {
							clearInterval(interval);
						}
					});
				}
			});
			this.addMobileStyle();
		},
		setOption: function(key, value) {
			this.calendar.datepicker("option", key, value);
		},
		getDate: function() {
			console.log(this.baseWidget);
			return this.baseWidget.datepicker("getDate");
		},
		_destroy: function() {
			return this.baseWidget.datepicker("destroy");
		},
		isDisabled: function() {
			return this.baseWidget.datepicker("isDisabled");
		},
		refresh: function() {
			return this.baseWidget.datepicker("refresh");
		},
		setDate: function(date) {
			return this.baseWidget.datepicker("setDate", date);
		},
		widget: function() {
			return this.element;
		},
		addMobileStyle: function() {
			this.calendar.addClass("ui-shadow").find(".ui-datepicker-calendar").addClass("mobile-enhanced").end().find(".ui-datepicker-calendar a,.ui-datepicker-prev,.ui-datepicker-next").addClass("ui-btn").end().find(".ui-datepicker-prev").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-l ui-shadow").end().find(".ui-datepicker-next").addClass("ui-btn-icon-notext ui-btn-inline ui-corner-all ui-icon-arrow-r ui-shadow").end().find(".ui-datepicker-header").addClass("ui-body-a ui-corner-top").removeClass("ui-corner-all").end().find(".ui-datepicker-calendar th").addClass("ui-bar-a").end().find(".ui-datepicker-calendar td").addClass("ui-body-a").end().find(".ui-datepicker-calendar a.ui-state-active").addClass("ui-btn-active").end().find(".ui-datepicker-calendar a.ui-state-highlight").addClass("ui-btn-up-a").end().find(".ui-state-disabled").css("opacity", "1");
		}
	});
})(jQuery);
