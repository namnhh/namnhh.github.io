//khoi tao khi load
window.onload = init;
var now = new Date();
//ham khoi tao
function init(){
	createYearOption();
    document.getElementById("icon_calendar").onclick = function() { showNow(); };	
	document.getElementById("y_pre").onclick = function() { preYear() };
	document.getElementById("y_next").onclick = function() { nextYear() };
	document.getElementById("m_pre").onclick = function() { preMonth() };
	document.getElementById("m_next").onclick = function() { nextMonth() };
	document.getElementById("m_select").onchange = function(){showOption()};
	document.getElementById("y_select").onchange = function() {showOption()};
  
}
//Show now
function showNow() {
	   var tbCalendar = document.getElementById("tbCalendar"); 
	   var month = document.getElementById("m_select");
       var year = document.getElementById("y_select");
       if (tbCalendar.style.display != "block") {
		month.selectedIndex = now.getMonth();
    	year.selectedIndex = now.getFullYear() - 1990;
        tbCalendar.style.display = "block";
		showCalendar(month.value,year.value);
    	}
}
// Hien thi Calendar
function showCalendar(m,y) {
	var month = m; console.log("month",month);
    var year = y; console.log("year",year);	
    var time = new Date(year,month,1);
	var time1 = new Date(year,Number(String(month))+1,0);
    var dayInMonth = time1.getDate();console.log("dayinmonth",dayInMonth);
    var fristDay = time.getDay(); 
	var i,j, d = 1;
	
	var row = tbCalendar.insertRow(-1);
	var cell;
	for (i = 0; i < fristDay; i++) {
	  cell = row.insertCell(0);
      cell.innerHTML = "&nbsp;";
	  cell.style.border = "solid 2px #CCCCCC";
	}
	for (i = fristDay; i < 7; i++) {
	  cell = row.insertCell(i);
      cell.innerHTML = d; 
	  cell.style.background = "#FFF";
	  if (d == now.getDate()) {
	      cell.style.border = "solid 2px #FF0000";
		  cell.style.background = "#0CF";
	  }
	  d++;
	}
	
	var week = Math.ceil((dayInMonth-d)/7); console.log("week",week);
	for (i = 0; i <= week; i++)
	{
		row = tbCalendar.insertRow(-1);
		for (j = 0; j < 7; j++)
		{		   
		   cell = row.insertCell(j);
		   cell.innerHTML = d;
		   cell.style.background = "#FFF";
		   if (d > dayInMonth) {
		       cell.innerHTML = "&nbsp;";
		       cell.style.border = "solid 2px #CCCCCC";
			   cell.style.background = "#000";
		   }
		   if(d == now.getDate()){
	           cell.style.border = "solid 2px #FF0000";
			   cell.style.background = "#0CF";
	       } 
		   if (month == 1 && d > dayInMonth ) {
			   cell.innerHTML = "&nbsp;";
		       cell.style.border = "solid 2px #CCCCCC";
			   cell.style.background = "#000";
		   }		   
		   
		   d++;
		}
	}
}

//Option chon Year
function createYearOption() {
	var year = document.getElementById("y_select");
	for (var i = 0; i < 30; i++) {
		var opt = document.createElement("option");
		opt.text = 1990 + i;
		opt.value = 1990 + i;
		year.options.add(opt);
	}
}
function clearRow() {
	var tbCalendar = document.getElementById("tbCalendar");
	var lastRow =  tbCalendar.rows.length - 1;
	for (var i = lastRow; i>=2; i--)
	{
		tbCalendar.deleteRow(i);
	}
}
//Previous Year
function preYear() {
	var month = document.getElementById("m_select");
    var year = document.getElementById("y_select");
	clearRow();
	if (year.selectedIndex > 0) {
		year.selectedIndex--;
	} else {
		year.selectedIndex = year.length - 1 ;
	}
	showCalendar(month.value,year.value);
}
//Next Year
function nextYear() {
    var month = document.getElementById("m_select");
    var year = document.getElementById("y_select");
	clearRow();
	if (year.selectedIndex < year.length - 1) {
		year.selectedIndex++;
	} else {
		year.selectedIndex = 0;
	}
	showCalendar(month.value,year.value);
}
//Next Month
function nextMonth() {
	var month = document.getElementById("m_select");
    var year = document.getElementById("y_select");
	clearRow();
	if (month.selectedIndex < 11) {
		month.selectedIndex++;
	} 
	else {
		month.selectedIndex = 0;
        if (year.selectedIndex < year.length - 1) {
			year.selectedIndex++;
		} else {
			year.selectedIndex = year.length - 1;
		}
	}
	showCalendar(month.value,year.value);
}
function preMonth() {
	var month = document.getElementById("m_select");
    var year = document.getElementById("y_select");
	clearRow();
	if (month.selectedIndex > 0) {
		month.selectedIndex--;
	} else {
		month.selectedIndex = 11;

		if (year.selectedIndex > 0) {
			year.selectedIndex--;
		} else {
			year.selectedIndex = year.length - 1 ;
		}
	}
	showCalendar(month.value,year.value);
}
function showOption() {
	var month = document.getElementById("m_select");
    var year = document.getElementById("y_select");
	clearRow();
	showCalendar(month.value,year.value);
}