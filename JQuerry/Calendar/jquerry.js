$(document).ready(function(e) {
var now = new Date();
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
  
}
//Show now
function showNow() {
	clearRow();
	var month = now.getMonth();
	var year = now.getFullYear(); 
    if ($("#tbCalendar").css("display") == 'none') {
      $("#m_select option:selected").val(month);
      $("#y_select option:selected").val(year);
      $("#tbCalendar").css("display", "block"); 
	  showCalendar($("#m_select").val(),$("#y_select").val());
	  $('select option[value="'+month+'"]').attr("selected",true);
	  $('select option[value="'+year+'"]').attr("selected",true);
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
		  cell+="<td style='background:#0CF;border:solid 2px #F00'>"+d+"</td>";
	  }
	  else cell+= "<td style='background:#FFF;border:solid 2ppx #FF0000'>"+d+"</td>";
	  d++;
	}
	$("#tbCalendar > tbody:last-child ").append(cell+"</tr>");
	
	var week = Math.ceil((dayInMonth-d)/7);
	for (i = 0; i <= week; i++)
	{   var cell = "<tr>";
		for (j = 0; j < 7; j++)
		{		   
		   if(d == now.getDate()){
			   cell+="<td style='background:#0CF;border:solid 2px #F00'>"+d+"</td>";
	       } 
		   else if(d <= dayInMonth) cell+="<td style='background:#FFF;border:solid 2px #FFF'>"+d+"</td>";
		   //if (d <= dayInMonth)
		   //cell.addEventListener("click", function(e) {choose=e.target.innerHTML;hideCalendar(m,choose,y)});
		   if (d > dayInMonth) {
			   cell+="<td style='background:#000;border:solid 2px #CCCCCC'>"+'&nbsp;'+"</td>";
		   }
		   if (month == 1 && d > dayInMonth ) {
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

}
//Next Year
function nextYear() {
	clearRow();
	console.log($("#m_select").text());
}
//Next Month
function nextMonth() {
	var month = $("#m_select");
    var year = $("#y_select");
	clearRow();
	if ($("#m_select").selectedIndex < 11) {
		$("#m_select").selectedIndex++;
	} 
	else {
		$("#m_select").selectedIndex = 0;
        if ($("#y_select").selectedIndex < $("#y_select").length - 1) {
			$("#y_select").selectedIndex++;
		} else {
			$("#y_select").selectedIndex = $("#y_select").length - 1;
		}
	}
	showCalendar($("#m_select").val(),$("#y_select").val());
}
//PreMonth
function preMonth() {
	clearRow();
	if ($("#m_select").val() > 0) {
		$("#m_select").val()--;
	} else {
		$("#m_select").val() = 11;

		if ($("#y_select").val > 1990) {
			$("#y_select").selectedIndex--;
		} else {
			$("#y_select").selectedIndex = $("#y_select").length - 1 ;
		}
	}
	showCalendar($("#m_select").val(),$("#y_select").val());
}
//show Option choose Month and Year
function showOption() {
	clearRow();
	showCalendar($("#m_select").val(), $("#y_select").val());
}
function hideCalendar(m,d,y) {
	var date_string = d + "/" + (Number(String(m))+1) + "/" + y; 
    $("#date").val() = date_string;
	$("#tbCalendar").css("display", "none");
}
});