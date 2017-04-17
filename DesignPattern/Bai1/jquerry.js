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
        var location = width *(slideIndex-1); 
        $("#box"+(slideIndex)).addClass('active');
        $slidesContainer.css('margin-left', '-'+location+'px');
			
        //set slider run automatic
			interval = setInterval(function() {
				$("#sli"+slideIndex).fadeOut(1000);
				$(".box").removeClass('active');
				$("#box"+(slideIndex+1)).addClass('active');
				location = width *(slideIndex); console.log(location);
				$slidesContainer.animate({'margin-left' :'-'+location+'px'}, speedAnimation, function() {
	   				slideIndex++;			   
	   				if(slideIndex == $slide.length) {
		 				$("#box1").addClass('active');
		 				slideIndex = 1;
		 				$slidesContainer.css('margin-left', '0px');
	   				}
				});
				$("#sli"+slideIndex).fadeIn();
			},pause);
	}
    //stop Slide
    function slideStop() {
    clearInterval(interval);
    $(".box").removeClass('active');
    }
	
    //click previous button
    function slidePrevious () {
        slideStop()
        slideIndex--;
        if(slideIndex < 1) 
		  slideIndex = 4;
        slideShow(slideIndex);
    }
	
    //click next button
    function slideNext() {
        slideStop()
        slideIndex++;
        if(slideIndex > 4) slideIndex = 1;
        slideShow(slideIndex);
    }
	
	//set when click
    function slideClick(n){
        slideStop();
        slideShow(slideIndex);
        slideIndex = n;
    };
	
	function slideInt() {
		slideShow(slideIndex);
	};
	
	return {
		show: slideInt ,
		previous: slidePrevious,
		next: slideNext,
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
 	jQuery.fn.onClick = function(n){
		 mySlideModule.click(n);
    };
});