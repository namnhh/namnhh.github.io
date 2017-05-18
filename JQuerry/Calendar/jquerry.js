$(document).ready(function(e) {
var now = new Date();
var choose;
init();
//ham khoi tao
function init(){
	createYearOption();
    $("#icon_calendar").click(function() { showNow() });	
	$("#y_pre").click(function() { preYear() });
	$("#y_next").click(function() { nextYear() });
	$("#m_pre").click(function() { preMonth() });
	$("#m_next").click(function() { nextMonth() });
	$("#m_select").change(function(){showOption()});
	$("#y_select").change(function() {showOption()});
	$("#tbCalendar").on('click','.tb',function(e){
    e.preventDefault();
    var d = $(this).text();
    hideCalendar(d);
    }); 
  
}
//Show now
function showNow() {
	clearRow();
	var month = now.getMonth();
	var year = now.getFullYear(); 
    if ($("#tbCalendar").css("display") == 'none') {
      $("#m_select").val(month);
      $("#y_select").val(year);
      $("#tbCalendar").css("display", "block"); 
	  showCalendar($("#m_select").val(),$("#y_select").val());
    }
}
// Hien thi Calendar
function showCalendar(m,y) {
	var month = m;
    var year = y;	
    var time = new Date(year,month,1);
	var time1 = new Date(year,Number(String(month))+1,0);
    var dayInMonth = time1.getDate();
    var fristDay = time.getDay(); 
	var i,j, d = 1;
	
	
	var cell = "<tr>";
	for (i = 0; i < fristDay; i++) {
      cell += "<td style='background:#000;border:solid 2px #CCCCCC'>"+'&nbsp;'+"</td>";
	}
	for (i = fristDay; i < 7; i++) {
	  //cell.addEventListener("click", function(e) {choose=e.target.innerHTML;hideCalendar(m,choose,y)});
	  if (d == now.getDate()) {
		  cell+="<td class='tb' style='background:#0CF;border:solid 2px #F00'>"+d+"</td>";
	  }
	  else cell+= "<td class='tb' style='background:#FFF;border:solid 2ppx #FF0000'>"+d+"</td>";
	  d++;
	}
	$("#tbCalendar > tbody:last-child ").append(cell+"</tr>");
	
	var week = Math.ceil((dayInMonth-d)/7);
	for (i = 0; i <= week; i++)
	{   var cell = "<tr>";
		for (j = 0; j < 7; j++)
		{		   
		   if(d == now.getDate()){
			   cell+="<td class='tb' style='background:#0CF;border:solid 2px #F00' >"+d+"</td>";
	       } 
		   else if(d <= dayInMonth) cell+="<td class='tb' style='background:#FFF;border:solid 2px #FFF'>"+d+"</td>";
		   //if (d <= dayInMonth)
		   //cell.addEventListener("click", function(e) {choose=e.target.innerHTML;hideCalendar(m,choose,y)});
		   if (month == 1 && d > dayInMonth ) {
			   cell+="<td style='background:#000;border:solid 2px #CCCCCC'>"+'&nbsp;'+"</td>";
		   }
		   else if (d > dayInMonth) {
			   cell+="<td style='background:#000;border:solid 2px #CCCCCC'>"+'&nbsp;'+"</td>";
		   }		   
		   
		   d++;
		}
		$("#tbCalendar > tbody:last-child ").append(cell+"</tr>");
	}
}

//Option choose Year
function createYearOption() {
	for (var i = 0; i <= 30; i++) {
		$('#y_select').append($('<option>', {value:1990+i, text:1990+i}));
	}
	
}
function clearRow() {
	var rowCount = $('#tbCalendar tr').length;
	for (var i = rowCount; i>2; i--)
	{
		$("#tbCalendar tr:last").remove();
	}
}
//Previous Year
function preYear() {
	clearRow();
	var y = Number($("#y_select").val());
	var lastYear = Number($("#y_select option:last").val());
	var firstYear = Number($("#y_select option:first").val());
	if (y > firstYear ) y--;
	else if(y <= firstYear) y = lastYear;
	$("#y_select").val(y); 
    showCalendar($("#m_select").val(), $("#y_select").val());
}
//Next Year
function nextYear() {
	clearRow();
	var y = Number($("#y_select").val());
	var lastYear = Number($("#y_select option:last").val());
	var firstYear = Number($("#y_select option:first").val());
	if (y < lastYear ) y++;
	else if(y >= firstYear) y = firstYear;
	$("#y_select").val(y); 
    showCalendar($("#m_select").val(), $("#y_select").val());
}
//Next Month
function nextMonth() {
	var m = Number($("#m_select").val());
    var y = Number($("#y_select").val());
	var lastYear = Number($("#y_select option:last").val());
	var firstYear = Number($("#y_select option:first").val());
	clearRow();
	if (m < 11) {
		m++;
	} 
	else {
		m = 0;
        if (y < lastYear ) y++;
	    else if(y >= firstYear) y = firstYear;
	}
	$("#y_select").val(y); 
	$("#m_select").val(m); 
	showCalendar($("#m_select").val(),$("#y_select").val());
}
//PreMonth
function preMonth() {
	var m = Number($("#m_select").val());
    var y = Number($("#y_select").val());
	var lastYear = Number($("#y_select option:last").val());
	var firstYear = Number($("#y_select option:first").val());
	clearRow();
	if (m > 0) {
		m--;
	} 
	else {
		m = 11;
       if (y > firstYear ) y--;
	   else if(y <= firstYear) y = lastYear;
	}
	$("#y_select").val(y); 
	$("#m_select").val(m); 
	showCalendar($("#m_select").val(),$("#y_select").val());
}
//show Option choose Month and Year
function showOption() {
	clearRow();
	showCalendar($("#m_select").val(), $("#y_select").val());
}
function hideCalendar(d) {
	var m = $("#m_select").val();
	var y =  $("#y_select").val();
	var date_string = d + "/" + (Number(String(m))+1) + "/" + y; 
    $("#date").val(date_string);
	$("#tbCalendar").css("display", "none");
}
});