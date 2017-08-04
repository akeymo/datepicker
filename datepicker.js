(function(){
	var datepicker = {

		montnData: '',

		render: function(direction){
			var _this = this;
			var year,month;
			if(this.montnData){
				year = this.montnData.year;
				month = this.montnData.month;
			}
			if(direction === 'prev'){
				month--;
			}
			if(direction === 'next'){
				month++;
			}
			var _html = this.buildUi(year,month);
			var $wrapper = document.querySelector('.ui-datepicker-wrapper');
			if(!$wrapper){
				// 第一次初始化
				$wrapper = document.createElement('div');
				$wrapper.className = 'ui-datepicker-wrapper';
				document.body.appendChild($wrapper);
			}

			$wrapper.innerHTML = _html;
		},

		init: function(input){
			var _this = this;
			_this.render();
			var $wrapper = document.querySelector('.ui-datepicker-wrapper')
			var $input = document.querySelector(input);
			var isOpen = false;
			$input.addEventListener('click',function(){
				if(isOpen){
					$wrapper.classList.remove('ui-datepicker-wrapper-show');
					isOpen = false;
				}else{
					$wrapper.classList.add('ui-datepicker-wrapper-show');

					// 给日期插件定位
					var top = $input.offsetTop;
					var left = $input.offsetLeft;
					var height = $input.offsetHeight;
					$wrapper.style.top = top + height + 2 + 'px';
					$wrapper.style.left = left + 'px';

					isOpen = true;
				}
			},false);

			// 月份点击切换
			$wrapper.addEventListener('click',function(e){
				var $target = e.target;
				if(!$target.classList.contains('ui-datepicker-btn')){
					return;
				}

				if($target.classList.contains('ui-datepicker-prev-btn')){
					// 上个月
					_this.render('prev');
				}else if($target.classList.contains('ui-datepicker-next-btn')){
					// 下个月
					_this.render('next');
				}
			},false);

			// 选中日期
			$wrapper.addEventListener('click',function(e){
				var $target = e.target;
				if($target.tagName.toLowerCase() != 'td'){
					return;
				}

				var date = new Date(_this.montnData.year, _this.montnData.month-1, $target.dataset.date);
				$input.value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			},false);
		},

		getMonthData: function(year, month){
			// 获取月份数据
			var ret = [];

			if(year == undefined || month == undefined){
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
				}else if(showDate>lastDate){
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
			var _this = this;
			_this.montnData = this.getMonthData(year,month);

			var html = '<div class="ui-datepicker-header">' 
					 	+ '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' 
						+ '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' 
						+ '<span class="ui-datepicker-curr-month">' + _this.montnData.year + '-' + _this.montnData.month +'</span>' 
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

			for(var i=0, len=_this.montnData.dates.length; i<len; i++){
				if(i%7 === 0){
					// 每星期的第一天
					html += '<tr>'
				}

				html += '<td data-date='+ _this.montnData.dates[i].date+'>' + _this.montnData.dates[i].showDate + '</td>'

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