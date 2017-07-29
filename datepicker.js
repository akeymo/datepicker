(function(){
	var datepicker = {

		init: function($dom){
			var _html = this.buildUi();
			var ele = document.querySelector($dom);
			ele.innerHTML = _html;
		},

		getMonthData: function(year, month){
			// 获取月份数据
			var ret = [];

			if(!year || !month){
				// 如果没有传值就获取当前日期
				var today = new Date();
				year = today.getFullYear();
				month = today.getMonth() + 1;
			}

			var firstDay = new Date(year, month-1, 1);

			year = firstDay.getFullYear();
			month = firstDay.getMonth() + 1;

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

			return {
				year: year,
				month: month,
				dates: ret
			};
		},

		buildUi: function(year, month){
			// 生成日历html结构
			var montnData = this.getMonthData(year,month);

			var html = '<div class="ui-datepicker-header">' 
					 	+ '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' 
						+ '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' 
						+ '<span class="ui-datepicker-curr-month">' + montnData.year + '-' + montnData.month +'</span>' 
						+ '</div>' 
						+ '<div class="ui-datepicker-body">' 
						+ '<table>' 
						+ '<thead>'
						+ '<tr>'
						+ '<th>一</th>'
						+ '<th>二</th>'
						+ '<th>三</th>'
						+ '<th>四</th>'
						+ '<th>五</th>'
						+ '<th>六</th>'
						+ '<th>日</th>'
						+ '</tr>'
						+ '</thead>'
						+ '<tbody>';

			for(var i=0, len=montnData.dates.length; i<len; i++){
				if(i%7 === 0){
					// 每星期的第一天
					html += '<tr>'
				}

				html += '<td>' + montnData.dates[i].showDate + '</td>'

				if(i%7 === 6){
					// 每星期最后一天
					html += '</tr>'
				}
			}	

			html += '</tbody> </table> </div>';

			return html;
		}


	};

	window.datepicker = datepicker;
})();