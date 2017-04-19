// JavaScript Document
$(document).ready(function() {
	
    var myDonutChart = (function () {
		 
    var myCanvas = $('#myCanvas')[0];
    myCanvas.width = 800; 
    myCanvas.height = 600;
    var ctx = myCanvas.getContext("2d");
	var centerX = myCanvas.width/2; 
	var centerY = myCanvas.height/2;
	
   
    //function draw Pie Slice  of Circle
    function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX,centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
	 }	 
	 
	 function drawChart(ctx, centerX, centerY, data, colors, donutSize) {
		 //define values for pie slice
	     var startAngle = -Math.PI / 2;		
	     var totalValue = 0;
		 var colorIndex = 0;
		 var pieRadius =  Math.min(centerX, centerY)/ 2; 
		 //get total value of chart
		 for (var categ in data) {
		     var val = data[categ];
			 totalValue += val;
		 }
		
		//draw pie chart
        for (categ in data) {
		    val = data[categ];
			var sliceAngle = 2 * Math.PI * val / totalValue;
			drawPieSlice(
			            ctx, 
			            centerX, 
						centerY,
						pieRadius,
						startAngle, 
						startAngle+sliceAngle,  
						colors[colorIndex%colors.length]
			);
			
			var offset = (pieRadius * donutSize) / 2;
		    var labelX = centerX + (offset + (pieRadius / 2)) * Math.cos(startAngle + sliceAngle * 0.5);
		    var labelY = centerY + (offset + (pieRadius / 2)) * Math.sin(startAngle + sliceAngle * 0.5); 
			ctx.fillStyle = textColor;
			ctx.font = textFont;
			ctx.fillText(val+"%", labelX, labelY);
			startAngle += sliceAngle;
			colorIndex++;
		}
	   
	        //draw circle in middle to make pie chart become donut chart
            if(donutSize > 0) {
		    drawPieSlice(
		   	            ctx,
						centerX,
						centerY,
						donutSize * pieRadius,
						0,
						2 * Math.PI,
						"#fff"
		    );
	        }
		
    }
    function drawText(data,colors) {
	    var str = "";
		var colorsIndex = 0;
		for (categ in data) {
		    val = data[categ];
			str += "<li style='margin-bottom:10px;'><span style='display:inline-block; width:20px;margin-right:15px; background-color:" 
			        + colors[colorsIndex++]
		            + "'>&nbsp;</span>" + categ + "</li>";
		}
		$("#content").append(str);
   }
   
    function drawDonutPieChart() {
        drawChart(ctx, centerX, centerY, data, colors, donutSize);
	    drawText(data, colors);
    }
   
    return {
        drawDonutPieChart : drawDonutPieChart    
    }
	
})();
  
    myDonutChart.drawDonutPieChart();
	
});