// JavaScript Document
window.onload = init;
function init () {
	init_date();
	document.getElementById("btnSub").onclick = function(){sub()};
	document.getElementById("btnRef").onclick = function(){refresh()};
}
function sub() {
	var name = document.getElementById("txtName").value;
	var pass = document.getElementById("txtPass").value;
	var email = document.getElementById("txtEmail").value;
	var date = document.getElementById("txtDate").value;
	if (checkValidate()) {	
		var xhttp = new XMLHttpRequest();
		//xhttp.open("GET", "http://localhost:3333/FormAjax/connect.php?User="+name+"&Pass="+pass+"&Email="+email+"&Date="+date, true);
		xhttp.open("GET", "http://ajaxformjs.byethost13.com/connect.php?User="+name+"&Pass="+pass+"&Email="+email+"&Date="+date, true);
		xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
				  if (this.responseText == "false")
                   alert("User has already exited");
			      else 
				   alert("Sign up success");
			  }   
		   };
        xhttp.send();
	}
}
function checkValidate () {
	if (!checkUser() || !checkPass() || !checkEmail() || !checkDate()) {
		return false;
	}
	return true;
}
function checkUser () {
	var name = document.getElementById("txtName");
	var showUserError = document.getElementById("showUserError");
	if (name.value == '') {
		showUserError.innerHTML = "Please type Username";
		name.focus();
		showUserError.style.color="#F00";
		return false;
	}
	else if (name.value.length < 8) {
		showUserError.innerHTML = "Username length min 8 letter";
		showUserError.style.color="#F00";
		name.focus();
		return false;
	} else {
		showUserError.innerHTML = "";
		return true;
	}
}
function checkPass () {
	var pass = document.getElementById("txtPass");
	var showPassError = document.getElementById("showPassError");
	if (pass.value == '') {
		showPassError.innerHTML = "Please type Password";
		pass.focus();
		showPassError.style.color="#F00";
		return false;
	}
	else if (pass.value.length < 8) {
		showPassError.innerHTML = "Password  length min 8 letter";
		pass.focus();
		showPassError.style.color="#F00";
		return false;
	} else {
		showPassError.innerHTML = "";
		return true;
	}
}
function checkEmail () {
	var email = document.getElementById("txtEmail");
	var showEmailError = document.getElementById("showEmailError");
	var atpos = email.value.indexOf("@");
    var dotpos = email.value.lastIndexOf(".");
	if (email.value == '') {
		showEmailError.innerHTML = "Please type Email";
		email.focus();
		showEmailError.style.color="#F00";
		return false;
	}
	else if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.value.length) {
		showEmailError.innerHTML = "Email wrong format";
		email.focus();
		showEmailError.style.color="#F00";
		return false;
	} else {
		showEmailError.innerHTML = "";
		return true;
	}
}
function checkDate () {
	var calendar = document.getElementById("txtDate");
	var showDayError = document.getElementById("showDayError");
	if (calendar.value == '') {
		showDayError.innerHTML = "Please choose date";
		calendar.focus();
		showDayError.style.color="#F00";
		return false;
	}  else {
		showDayError.innerHTML = "";
		return true;
	}
}
function refresh() {
	document.getElementById("txtName").value = "";
	document.getElementById("txtPass").value = "";
	document.getElementById("txtEmail").value = "";
	document.getElementById("txtDate").value = "";
	document.getElementById("showUserError").innerHTML = "";
	document.getElementById("showPassError").innerHTML = "";
	document.getElementById("showEmailError").innerHTML = "";
	document.getElementById("showDayError").innerHTML = "";
}