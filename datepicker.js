(function(){
	var datepicker = {
		getMonthData: function(year, month){
			var ret = [];

			if(!year || !month){
				// 如果没有传值就获取当前日期
				var today = new Date();
				year = today.getFullYear();
				month = today.getMonth() + 1;
			}

			var firstDay = new Date(year, month-1, 1);
			var firstDayWeekDay = firstDay.getDay();
			if(firstDayWeekDay === 0){
				firstDayWeekDay = 7;
			}

			var lastDayOfLastMonth = new Date(year, month-1, 0);
			var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
			var preMonthDayCount = firstDayWeekDay - 1;
			var lastDay = new Date(year, month, 0);
			var lastDate = lastDay.getDate();

			for(var i=0; i<7*6; i++){
				var date = i + 1 - preMonthDayCount;
				var showDate = date;
				var thisMonth = month;

				if(showDate<=0){
					// 上个月
					thisMonth = month - 1;
					showDate = lastDateOfLastMonth + date;
				}else if(showDate>lastDay){
					// 下个月
					thisMonth = month + 1;
					showDate = showDate - lastDate;
				}

				if(thisMonth === 0) thisMonth = 12;
				if(thisMonth === 13) thisMonth = 1;

				ret.push({
					month: thisMonth,
					date: date,
					showDate: showDate
				})
			}

			return ret;
		},


	};

	window.datepicker = datepicker;
})();