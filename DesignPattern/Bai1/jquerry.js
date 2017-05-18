$(document).ready(function() {
	var slideIndex = 1;
	// create mySlideModule
	var mySlideModule = ( function() {	
	//config
	var width = 635;
	var speedAnimation = 1000;
	var pause = 3000;

	//cache DOM
	var $slider = $('#slider');
	var $slidesContainer = $slider.find('.slides-container');
	var $slide = $slidesContainer.find('.slide');
	var interval;
	
	//show slider 
	function slideShow(n) {
		slideIndex = n;
		//init for slider
		$("#box"+(slideIndex)).addClass('active');
		var location = width * slideIndex; 
		$(".slide").css("opacity",0.3);
		$( ".slide" ).eq(slideIndex-1).css("opacity",1); 
		$slidesContainer.animate({'margin-left' :'-'+(location - width)+'px'}, speedAnimation/2);
		
		//set slider run automatic
			interval = setInterval(function() {
				$(".slide").css("opacity",1);
				$(".box").removeClass('active');
				$("#box"+(slideIndex+1)).addClass('active');
				location = width *(slideIndex); 
				$slidesContainer.animate({'margin-left' :'-'+location+'px'}, speedAnimation, function() {
					slideIndex++;			   
					if(slideIndex == $slide.length) {
						$("#box1").addClass('active');
						slideIndex = 1;
						$slidesContainer.css('margin-left', '0px');
					}
				});
				$( ".slide" ).eq(slideIndex-1).css("opacity",0.3);
			},pause);
		}
	//stop Slide
	function slideStop() {
		clearInterval(interval);
		$(".box").removeClass('active');
	}
	
	var timeClick = 0;
	
	//click previous button
	function slidePrevious () {
		var date = new Date;
		var time = date.getSeconds();
		if (time != timeClick) {
			timeClick = time;
			slideStop();
			slideIndex--;
			if(slideIndex < 1) { 
				slideIndex = 4;
			}
			slideShow(slideIndex);
		}
	}
	
	//click next button
	function slideNext() {
		var date = new Date;
		var time = date.getSeconds();
		if (time != timeClick) {
			timeClick = time;
			slideStop()
			slideIndex++;
			if(slideIndex > 4) {
				slideIndex = 1;
			}
			slideShow(slideIndex);
		}
	}
	
	//set when click
	function slideClick(n){
		var date = new Date;
		var time = date.getSeconds();
		if (time != timeClick) {
			timeClick = time;
			slideStop();
			slideIndex = n;
			slideShow(slideIndex); 
		}		
	};
	
	function slideInt() {
		slideShow(slideIndex);
	};
	
	return {
		show: slideInt ,
		previous: slidePrevious ,
		next: slideNext ,
		click: slideClick
	}
	
	})();
	
	//call mySlideModule
	mySlideModule.show();
	$("#previous").click(function () {
		mySlideModule.previous();
	});
	
	$("#next").click(function () {
		mySlideModule.next();
	});
	
	jQuery.fn.onClick = function(n) {
		mySlideModule.click(n);
	};
	
});