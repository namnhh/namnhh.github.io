$(document).ready(function() {
    var slideIndex=1;
	showSlide(slideIndex);
	setInterval(function(){ $("#next").click(); }, 5000);
function showSlide(n) {
	$("#image"+n).show();
	$("#box"+n).addClass("active");
}
function hideSlide(n) {
	$("#image"+n).hide();
	$("#box"+n).removeClass("active");
}
$("#previous").click(function () {
	hideSlide(slideIndex);
	slideIndex--;
	if(slideIndex < 1) slideIndex = 4;
	showSlide(slideIndex);
});
$("#next").click(function () {
	hideSlide(slideIndex);
	slideIndex++;
	if(slideIndex > 4) slideIndex = 1;
	showSlide(slideIndex);
});
jQuery.fn.onClick = function(n){
		hideSlide(slideIndex);
		showSlide(n);
		slideIndex = n;
};
});