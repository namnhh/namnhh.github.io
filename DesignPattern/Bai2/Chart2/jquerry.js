// JavaScript Document
$(document).ready(function() {
    var sinChart = (function () {    
    var myCanvas = $('#myCanvas')[0];
    myCanvas.width = 600; 
    myCanvas.height = 400;
    var ctx = myCanvas.getContext("2d");
    var maxValue = itemValue[itemValue.length-1]; 
    var flag = true;
    // set max values of chart and check value
	    for (i = 0; i < itemData.length; i++) {
			 if (itemData[i] <= 0) {
				 flag = false;
			 }
		}
		
    function drawChart(ctx, itemData, colorItemData, fontItemData, itemValue, colorItemValue, fontItemValue, colorLine) {
		 //init
        var xScale;
        var yScale;
        var y;
        var stepSize = 1;
        var columnSpace = 70; // top to line 0y
        var rowSpace = 30; //distance between graph bars 
        var space = 10;
		
		
        yScale = (myCanvas.height - columnSpace - space) / (maxValue); 
        xScale = (myCanvas.width - rowSpace) / (itemData.length);	
	    
		// set value in Oy
		ctx.beginPath();
		ctx.fillStyle = colorItemValue; //color of value
		ctx.font = fontItemValue;
		var count =  0;
	    for (scale = maxValue; scale >= 1; scale = scale - stepSize) {
		    y = columnSpace/2 + (yScale * count * stepSize);  
		    ctx.fillText(scale, space, y + space - 5);
		    count++;
	    }
		
		//draw line Oy
        ctx.beginPath();
        var locationOy // exactly location of OY
		locationOy = y = columnSpace/2 + (yScale * count * stepSize);  
        ctx.fillText(scale, space, y + space - 5);
        ctx.moveTo(rowSpace, y); //begin of line
        ctx.lineTo(rowSpace, columnSpace/4 ); 
        ctx.strokeStyle="black";	
        ctx.stroke();
			
		//draw line Ox
		ctx.beginPath();
		y = columnSpace/2 + (yScale * count * stepSize);  
        ctx.fillText(scale, space, y + space - 5);
        ctx.moveTo(rowSpace, y); //begin of line
        ctx.lineTo(myCanvas.width, y); 
        ctx.strokeStyle="black";	
        ctx.stroke();
			
		// fill value in 0x. If want to see value on Ox	
		/*ctx.beginPath();
		ctx.fillStyle = colorItemData;
		ctx.font = fontItemData;
		for (i = 0; i < itemData.length; i++) {
		     ctx.fillText(itemData[i], xScale * (i+0.7) ,myCanvas.height - columnSpace/4);
	    }
		ctx.fill();	*/	
			
		
		// draw sin line 
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = colorLine; //color of line	
        ctx.moveTo (xScale * (0+0.7) , locationOy - (yScale * itemData[0] * stepSize));
        for (i = 0; i < itemData.length; i++) {
            var maskX = Math.abs(itemData[i] - itemData[i+1]) / 4;
            var maskY = Math.abs(itemData[i] - itemData[i+1]) / 40;
            if(itemData[i] < itemData[i+1]) {
                ctx.bezierCurveTo (xScale * (i+0.7+ maskX) ,locationOy - (yScale * (itemData[i] + maskY )),
				xScale * (i+1+0.7-maskX),locationOy - (yScale * (itemData[i+1] - maskY )),
		        xScale * (i+1+0.7), locationOy - (yScale * itemData[i+1] * stepSize));
            }
            else {
                ctx.bezierCurveTo (xScale * (i+0.7+ maskX) ,locationOy - (yScale * (itemData[i] - maskY )),
		        xScale * (i+1+0.7-maskX),locationOy - (yScale * (itemData[i+1] + maskY )),
		        xScale * (i+1+0.7), locationOy - (yScale * itemData[i+1] * stepSize));	   
		   }
	    }
		ctx.stroke();	
	}	
	
	function fillText() {
		var stringHeader, stringItemValue, stringItemData, string;
		stringHeader = "<h1>" + header + "</h1>";
		$("#header").append(stringHeader);
		
		stringItemValue = "<p>" + itemValueTitle + "</p>";
		$("#left").append(stringItemValue);
		
		stringItemData = "<p>" + itemDataTitle + "</p>";
		$("#footer").append(stringItemData);
    }
	
    function drawsinChart() {
		if (flag) {
	        drawChart(ctx, itemData, colorItemData, fontItemData, itemValue, colorItemValue, fontItemValue, colorLine);  
            fillText();
		}
		else {
	        alert("Wrong Input");
		}
	}
	return {
		draw : drawsinChart
	}
	
    })();

    sinChart.draw();
});
