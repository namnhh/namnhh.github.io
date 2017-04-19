// JavaScript Document
$(document).ready(function() {
    var success = 0.8; // % of block success
    var my3DPieChart = (function () { 
        var myCanvas = $('#myCanvas')[0];
        myCanvas.width = 800; 
        myCanvas.height = 600;
        var ctx = myCanvas.getContext("2d");
        var xscale = 1; // scalde. make circle become eclipe
        var yscale = 0.5;
        var centerX = 400;  // location of center point of circle
        var centerY = 500; 
        var radius = 200; //radius of circle 
        var i = 1;
        var space = 12; // distance between fail and success
	
	    //draw 3D Pie Chart
	    function draw3DPieChart() {
			if (success > 0 && success < 1) {
	            for(i = 100; i > 0; i--) {
		            drawSuccess(); // call function success
		            drawFail(); // call function fail
	            }
		    drawText();
			}
			else {
			    alert("Wrong Success Input");	
			}
	    }
		
	    //function draw block blue success
	    function drawSuccess() {
		    ctx.save();
		    ctx.scale(xscale,yscale);
            ctx.beginPath();
            ctx.arc(centerX, centerY + i, radius, 0, 2 * Math.PI * success);
            ctx.lineTo(centerX, centerY + i); 
		    ctx.restore();
		    if (i==1) {
		        ctx.fillStyle = "#03C"; // top of chart
			}
 		    else {
		        ctx.fillStyle = "#0CF";
			}
		    ctx.fill();
	    }
	
	    //function draw block red fail
	    function drawFail() {
		    ctx.save(); // save default state
		    ctx.scale(xscale,yscale); // scale canvas make circle to eclipse
	        ctx.beginPath(); // begin draw
            ctx.arc(centerX + space, centerY - space + i, radius, (2 * Math.PI * success)+0.01,-0.01); // draw circle
            ctx.lineTo(centerX + space, centerY - space + i); // distance between 2 block
	        ctx.restore(); // Restore original state
		    if (i==1) {
		        ctx.fillStyle = "#F00"; // top of chart
			}
		    else {
		        ctx.fillStyle = "#FFB2B2";
			}
		    ctx.fill();
	    }
    
        //function fill text 
	    function drawText() {
			var radian = 0;
			var lableSpace1 = 0;
			var lableSpace2 = 0;
			var lableX1 = 0;
			var lableX2 = 0;
			var lableY1 = 0;
			var lableY2 = 0;
			if (success >= 0.5) {
				radian = 1 - success ;
			    lableSpace1 = (radius*2/3)*xscale * Math.cos(2*Math.PI*radian + 0.01) ;
			    lableSpace2 = (radius*2/3)*yscale * Math.sin(2*Math.PI*radian + 0.01) ;
				lableX1 = (centerX + space*2 +13) * xscale + lableSpace1;
			    lableY1 = (centerY - space*2 +13)  *yscale - lableSpace2;
			    lableX2 = 2*centerX*xscale - lableX1;
			    lableY2 = 2*centerY*yscale - lableY1;
				drawLine(100, 155, lableX2, lableY2,120, "#0CF"); // block success
			    drawLine(670, 105, lableX1, lableY1,-140, "#FFB2B2"); //block fail
			
			}
			else {
				lableSpace1 = (radius*2/3)*xscale * Math.cos(2*Math.PI*radian + 0.01) ;
			    lableSpace2 = (radius*2/3)*yscale * Math.sin(2*Math.PI*radian + 0.01) ;
				lableX1 = (centerX + space*2 +13) * xscale + lableSpace1;
			    lableY1 = (centerY + space*2 +13)  *yscale + lableSpace2;
			    lableX2 = 2*centerX*xscale - lableX1;
			    lableY2 = 2*centerY*yscale - lableY1;
				drawLine(100, 155, lableX1, lableY1,120, "#0CF"); // block success
			    drawLine(670, 105, lableX2, lableY2,-140, "#FFB2B2"); //block fail
			}
			    
 	        ctx.font = "20px Arial";
		    ctx.fillStyle = "blue";
		    ctx.fillText("BIỂU ĐỒ TỔNG QUÁT KHUNG NĂNG LỰC", 200, 450);
		    ctx.fillStyle = "gray";
		    ctx.fillText(success*100+"% ĐÃ ĐẠT", 100, 150);		   
		    ctx.fillText(100-(success*100)+"% Chưa ĐẠT", 530, 100);
			
			
	    }

	    //draw 2 line 
	    function drawLine(firstX, firstY, secondX, secondY, width, color) {
		    ctx.strokeStyle = color;
		    ctx.lineWidth = 5;
		    ctx.beginPath();
		    ctx.moveTo(firstX, firstY);
		    ctx.lineTo (firstX + width, firstY);
		    ctx.lineTo (secondX ,secondY);		
		    ctx.stroke();
	    }
		
	    return {
		    draw:draw3DPieChart
	    }
    })();
  
    my3DPieChart.draw();
});