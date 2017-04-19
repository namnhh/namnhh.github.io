// JavaScript Document
$(document).ready(function() {
	var barGraphChart = (function () {    
    var myCanvas = $('#myCanvas')[0];
    myCanvas.width = 600; 
    myCanvas.height = 400;
    var ctx = myCanvas.getContext("2d");
    var maxValue = 0;
	
    function drawChart() {
		// max values of chart
		for (i=0;i<itemValue.length;i++) {
			 if (maxValue < itemValue[i]) {
				 maxValue = itemValue[i];
			 }
		}
		 //init
		var xScale;
        var yScale;
        var y;
	    var stepSize = 1;
	    var columnSpace = 70; // top to graph bar
	    var rowSpace = 50; //distance between graph bars 
	    var space = 10;
		
		
	    yScale = (myCanvas.height - columnSpace - space) / (maxValue); 
	    xScale = (myCanvas.width - rowSpace) / (itemName.length);	
	    
		// set value in  and draw line behind column  
		ctx.beginPath();
		ctx.strokeStyle = colorLine; // color of lines
		ctx.fillStyle = colorItemValue; //color of value
		ctx.font = fontItemValue;
		var count =  0;
	    for (scale = maxValue; scale >= 1; scale = scale - stepSize) {
		    y = columnSpace/2 + (yScale * count * stepSize);  
		    ctx.fillText(scale, space, y + space - 5);
		    ctx.moveTo(rowSpace, y); //begin of line
		    ctx.lineTo(myCanvas.width, y); // end of line
		    count++;
	    }
	    ctx.stroke();
		
		//draw line as Ox
		ctx.beginPath();
		y = columnSpace/2 + (yScale * count * stepSize);  
		    ctx.fillText(scale, space, y + space - 5);
		    ctx.moveTo(rowSpace, y); //begin of line
		    ctx.lineTo(myCanvas.width, y); 
		    ctx.strokeStyle="black";	
            ctx.stroke();
			
		// fill text as 0x	
		ctx.beginPath();
		ctx.fillStyle = colorItemName;
		ctx.font = fontItemName;
		for (i = 0; i < itemName.length; i++) {
		     y = myCanvas.height - itemValue[i] * yScale ;
		     ctx.fillText(itemName[i], xScale * (i+0.7) ,myCanvas.height - columnSpace/4);
	    }
		ctx.fill();		
			
		// draw column of graph bars 
		ctx.fillStyle = colorColumn; //color of column	
		ctx.translate(0,myCanvas.height - space - columnSpace/2);
	    ctx.scale(xScale, -1 * yScale);
	    for (i = 0; i <= maxValue; i++) {
		    ctx.fillRect(i+0.45, 0, 0.6, itemValue[i]);
	    }		
		
	}	
	   
    return {
		draw : drawChart
	}
	
    })();

    barGraphChart.draw();
});
