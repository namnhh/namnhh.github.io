$(document).ready(function(e) 
{
	/*************************************************************************************/
	var canvas = new fabric.Canvas('main_canvas');	
	fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
	canvas.backgroundColor = '#ffffcc';
	
	var index_tab = 0;//index tab
	/*************************************************************************************/
	Array.prototype.max = function() {
	  return Math.max.apply(null, this);
	};
	
	Array.prototype.min = function() {
	  return Math.min.apply(null, this);
	};
	/*************************************************************************************/
	function makeLine(coords) 
	{
		return new fabric.Line(coords, 
		{
		  fill: 'gray',
		  stroke: 'gray',
		  strokeWidth: 1,
		  selectable: false
		});
	}
	
	function makeGrayLine(coords) 
	{
		return new fabric.Line(coords, 
		{
		  fill: 'gray',
		  stroke: 'gray',
		  strokeWidth: 1,
		  selectable: false
		});
	}
	
	function makeGrayLineStrong(coords) 
	{
		return new fabric.Line(coords, 
		{
		  fill: 'gray',
		  stroke: 'gray',
		  strokeWidth: 2,
		  selectable: false
		});
	}
	
	function makeRedLine(coords) 
	{
		return new fabric.Line(coords, 
		{
		  fill: 'red',
		  stroke: 'red',
		  strokeWidth: 2,
		  selectable: false
		});
	}

	function makeBlueLine(coords) 
	{
		return new fabric.Line(coords, 
		{
		  fill: 'blue',
		  stroke: 'blue',
		  strokeWidth: 2,
		  selectable: false
		});
	}
	
	function makeBlueLine2(coords) 
	{
		return new fabric.Line(coords, 
		{
		  fill: '#bde0ff',
		  stroke: '#bde0ff',
		  strokeWidth: 2,
		  selectable: false
		});
	}
	
	function makeText(text,left,top)
	{
		return new fabric.Text(text, {
		  fontSize: 12,
		  left:left,
		  top:top,
		  fill:'black',
		  originX: 'center',
		  originY: 'center',
		  selectable: false
		});
	}
	
	function makeTitle(text,left,top)
	{
		return new fabric.Text(text, {
		  fontSize: 12,
		  left:left,
		  top:top,
		  fill:'black',
		  originX: 'right',
		  originY: 'center',
		  selectable: false
		});
	}
	
	function makeOptionText(text,left,top,color)
	{
		return new fabric.Text(text, {
		  fontSize: 12,
		  left:left,
		  top:top,
		  fill:color,
		  originX: 'right',
		  originY: 'center',
		  selectable: false
		});
	}
	
	function makeRedText(text,left,top)
	{
		return new fabric.Text(text, {
		  fontSize: 12,
		  left:left,
		  top:top,
		  fill:'red',
		  originX: 'right',
		  originY: 'center',
		  selectable: false
		});
	}
	
	function makeBlueText(text,left,top)
	{
		return new fabric.Text(text, {
		  fontSize: 12,
		  left:left,
		  top:top,
		  fill:'blue',
		  originX: 'right',
		  originY: 'center',
		  selectable: false
		});
	}
	
	function makeCircle(left, top) 
	{
		return new fabric.Circle
		({
			  left: left+0.5,
			  top: top,
			  strokeWidth: 0.5,
			  radius: 1,
			  fill: 'black',
			  stroke: 'black',
			  selectable: false
		});
	}
	
	function makeTriangle(left,top,angle)
	{
		return new fabric.Triangle
		({  
			width: 4, 
			height: 4, 
			fill: 'black', 
			left: left+0.5, 
			top: top, 
			angle: angle, 
			selectable: false  
		});
	}
	
	
	function makeRect(left,top,color)
	{
		return new fabric.Rect
		({  
			width: 12, 
			height: 12, 
			fill: color, 
			left: left, 
			top: top, 
			selectable: false  
		});
	}

	//draw chart
	
	text_value = makeTitle('温度・湿度２４時間データ',550,30);
	canvas.add(text_value);
	drawingFramesChart(array_hour_c,array_hour_percent,array_hour_option);
	function drawingFramesChart(array_c,array_percent,array_option)//Ox : 720px, Oy 420px
	{
		var main_layer = new fabric.Group([], {	  left: 170,	  top: 50	, selectable: false});
		//draw y (temperature C)
		frameLength_y_c = 80;
		line = makeLine([ 0, 20, 0, 420 ]);
		text_value = makeRedText('温度\n ºC',-5,-10);
		main_layer.add(line,text_value);
		var	temp_c = 40;
		for(i=0;i<=5;i++)
		{
			if(i==0 || i==5)
			{
				gray_line = makeGrayLineStrong([690,frameLength_y_c*i+20,-100,frameLength_y_c*i+20]);
			}
			else if (i==4)
			{
				for(j=1;j<=3;j++)
				{
					line = makeBlueLine2([690,frameLength_y_c*i+20+(j*20),0,frameLength_y_c*i+20+(j*20)]);
					text_value = makeOptionText(optionTitle[j-1],-10,frameLength_y_c*i+20+(j*20),optionColors[j-1]);
					main_layer.add(line,text_value);
				}
				gray_line = makeGrayLine([690,frameLength_y_c*i+20,-100,frameLength_y_c*i+20]);
			}
			else
			{
				gray_line = makeGrayLine([690,frameLength_y_c*i+20,-100,frameLength_y_c*i+20]);	
			}
			text_value = makeRedText(temp_c.toString(),-10,frameLength_y_c*i+13);
			temp_c-=10;
			main_layer.add(text_value,gray_line);
		}
		//draw y (temperature %)
		frameLength_y_temperature = 80;
		//line = makeLine([ -50, 20, -50, 420 ]);
		text_value = makeBlueText('湿度\n %',-50,-10);
		main_layer.add(text_value,line);
		for(i=0;i<=5;i++)
		{
			text_value = makeBlueText((100-i*20).toString(),-55,frameLength_y_temperature*i+13);
			main_layer.add(text_value);
		}
		//draw x (hour/day)
		
		if(index_tab == 0)
		{
			text_value = makeText('時間',720,420+7); //chang Ox's title of tab 24h here. 
			//line = makeGrayLineStrong([ -100, 420, 721, 420 ]);
			main_layer.add(text_value);
			
			frameLength_x_hour = 30;
			length_x_hour = 23;
			for(i=0;i<=length_x_hour;i++)
			{				
				if((length_x_hour-i)%10==0 || i == 0)
				{
					gray_line = makeGrayLineStrong([frameLength_x_hour*i,420,frameLength_x_hour*i,20]);
					text_value = makeText(((length_x_hour-i)*-1).toString(),frameLength_x_hour*i+4,420+7);
					main_layer.add(text_value,gray_line);	
				}
				else
				{
					gray_line = makeGrayLine([frameLength_x_hour*i,420,frameLength_x_hour*i,20]);
					main_layer.add(gray_line);
				}
				
			}
			drawingChart(array_c,array_percent,frameLength_x_hour);//call draw chart
			drawingSmallChart(array_option,length_x_hour,frameLength_x_hour,optionColors)//call small chart
		}
		//draw x (day/month)
		else if (index_tab == 1)
		{
			text_value = makeText('日',720,420+7); //chang Ox's title of tab 30 days here. 
			line = makeGrayLineStrong([ -100, 420, 690, 420 ]);
			//triangle = makeTriangle(800,420,90);
			main_layer.add(text_value,line);
			
			frameLength_x_day = 23;
			length_x_day = 30;
			for(i=0;i<=length_x_day;i++)
			{
				if(i==0 || (length_x_day-i)%10==0)
				{
					gray_line = makeGrayLineStrong([frameLength_x_day*i,420,frameLength_x_day*i,20]);
					text_value = makeText(((length_x_day-i)*-1).toString(),frameLength_x_day*i+4,420+7);
					main_layer.add(text_value,gray_line);
				}
				else
				{
					gray_line = makeGrayLine([frameLength_x_day*i,420,frameLength_x_day*i,20]);
					main_layer.add(gray_line);
				}
			}
			
			drawingChart(array_c,array_percent,frameLength_x_day);//call draw chart
			drawingSmallChart(array_option,length_x_day,frameLength_x_day,optionColors);//call small chart
		}
		else 
		{
			text_value = makeText('minutes',720,420+7); //chang Ox's title of tab 60 minutes here. 
			line = makeGrayLineStrong([ -100, 420, 690, 420 ]);
			main_layer.add(text_value,line);
			
			frameLength_x_minute = 11.5;
			length_x_minute = 60;
			for(i=0;i<=length_x_minute;i++)
			{
				if(i==0 || (length_x_minute-i)%10==0)
				{
					gray_line = makeGrayLineStrong([frameLength_x_minute*i,420,frameLength_x_minute*i,20]);
					text_value = makeText(((length_x_minute-i)*-1).toString(),frameLength_x_minute*i+4,420+7);
					main_layer.add(text_value,gray_line);
				}
				else
				{
					gray_line = makeGrayLine([frameLength_x_minute*i,420,frameLength_x_minute*i,20]);
					main_layer.add(gray_line);
				}
			}
			
			drawingChart(array_c,array_percent,frameLength_x_minute);//call draw chart
			drawingSmallChart(array_option,length_x_minute,frameLength_x_minute,optionColors);//call small chart
		}
		
		canvas.add(main_layer);
		canvas.sendBackwards(main_layer);
		
	}//end draw frame
	
	function drawingChart(array_1,array_2,line_length)//draw chart
	{
		var main_chart = new fabric.Group([], {	  left: 170,	top: 70	, selectable: false});

		for(i=0;i<array_1.length-1;i++)
		{
			
			r_x1= 320-((array_1[array_1.length-1-i])*8);	
			r_x2= 320-((array_1[array_1.length-2-i])*8);	
				
			b_x1= 400-((array_2[array_2.length-1-i])*4);	
			b_x2= 400-((array_2[array_2.length-2-i])*4);
			
			line_red  = makeRedLine([line_length*i,r_x1,line_length*(i+1),r_x2   ]);
			line_blue = makeBlueLine([line_length*i,b_x1,line_length*(i+1),b_x2   ]);

			main_chart.add(line_red,line_blue);
		}
		canvas.add(main_chart);
	}//end draw chart
	
	function drawingSmallChart(array,length,line_length,color)//draw small chart
	{
		var main_chart = new fabric.Group([], {	  left: 170,	top: 70	, selectable: false});
		for(i=0;i<array.length;i++)
		{
			for (j=0;j<array[i].length;j++) {
			rect = makeRect(line_length*(length-array[i][j]),80*4+20+(20*i),color[i]);
			main_chart.add(rect);
			}
		} 			

		canvas.add(main_chart);
	}//end draw small chart

	
	// event
	$(".ul_tab li").click(function(e){
		if($(this).index() != index_tab)
		{
			canvas.clear();
			index_tab = $(this).index();
			$('.ul_tab li a').removeClass("act");
			$('.ul_tab li a').eq(index_tab).addClass("act");
			if(index_tab == 0)
			{
				text_value = makeTitle('温度・湿度２４時間データ',550,30); // set title for tab 24h
				canvas.add(text_value);
				drawingFramesChart(array_hour_c,array_hour_percent,array_hour_option);	
			}
			
			else if(index_tab == 1)
			{
				text_value = makeTitle('温度・湿度３０日データ',550,30);//set title for 30 days
				canvas.add(text_value);				
				drawingFramesChart(array_day_c,array_day_percent,array_day_option);	
			}
			else
			{
				text_value = makeTitle('60 minute',550,30);//set title for 30 days
				canvas.add(text_value);				
				drawingFramesChart(array_minute_c,array_minute_percent,array_minute_option);
			}
			
		}
	});
});


