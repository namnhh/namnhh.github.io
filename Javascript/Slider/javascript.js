var slideIndex=1;
function showSlide(n) {
	var sli = document.getElementsByClassName("sli");
	var box = document.getElementsByClassName("box");
	var i;
	if (n > sli.length) {
	     slideIndex = 1;	
	}
	if (n < 1) {
	     slideIndex = sli.length;	
	}
	for (i = 0; i < sli.length; i++) {
      sli[i].style.display = "none";  
    }
	for (i = 0 ; i < box.length; i++) {
		box[i].className = box[i].className.replace(" active", "");
	}
	sli[slideIndex-1].style.display = "block";
	box[slideIndex-1].className += " active";
	console.log(slideIndex);
}
function plusDiv(n)
{
	showSlide(slideIndex+=n);
	
}
function currentDiv(n)
{
	showSlide(slideIndex=n);
}
