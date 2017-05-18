$(document).ready(function() {
init();
function init () {
	init_date();
	$("#btnSub").click(function(){submit()});
	$("#btnRef").click(function(){refresh()});
}
function submit() {
	 var user = $("#txtName").val();
	 var pass = $("#txtPass").val();
	 var email = $("#txtEmail").val();
	 var date = $("#txtDate").val();
	if (checkValidate()) {	
		$.ajax({
				 url:"http://ajaxformjq.byethost16.com/FormAjax/connect.php",
			    //url:"http://localhost:3333/FormAjax/connect.php",
				type:"GET",
				data:{"User":user,"Pass":pass,"Email":email,"Date":date},
				success: function(data){
				   console.log(data);
				   if (data == "false") {
                    alert("User has already exited");
                   }
			       else {
				    alert("Sign up success");
			       }     
				}
			})// End Ajax
		}
}
function checkValidate () {
	if (!checkUser() || !checkPass() || !checkEmail() || !checkDate()) {
		return false;
	}
	return true;
}
function checkUser () {
	if ($("#txtName").val() == '') {
		$("#showUserError").text("Please type UserName");
		$("#txtName").focus();
		$("#showUserError").css("color","#F00");
		return false;
	}
	else if ($("#txtName").val().length < 8) {
		$("#showUserError").text("UserName length min 8 letter");
		$("#txtName").focus();
		$("#showUserError").css("color","#F00");
		return false;
	} else {
		$("#showUserError").text("");
		return true;
	}
}
function checkPass () {
	if ($("#txtPass").val() == '') {
		$("#showPassError").text("Please type Password");
		$("#txtPass").focus();
		$("#showPassError").css("color","#F00");
		return false;
	}
	else if ($("#txtPass").val().length < 8) {
		$("#showPassError").text("Password  length min 8 letter");
		$("#txtPass").focus();
		$("#showPassError").css("color","#F00");
		return false;
	} else {
		$("#showPassError").text("");
		return true;
	}
}
function checkEmail () {
	var atpos = $("#txtEmail").val().indexOf("@");
    var dotpos = $("#txtEmail").val().lastIndexOf(".");
	if ($("#txtEmail").val() == '') {
		$("#showEmailError").text("Please type Email");
		$("#txtEmail").focus();
		$("#showEmailError").css("color","#F00");
		return false;
	}
	else if (atpos < 1 || dotpos < atpos+2 || dotpos+2 >= $("#txtEmail").val().length) {
		$("#showEmailError").text("Email wrong format");
		$("#txtEmail").focus();
		$("#showEmailError").css("color","#F00");
		return false;
	} else {
		$("#showEmailError").text("");
		return true;
	}
}
function checkDate () {
	if ($("#txtDate").val() == '') {
		$("#showDayError").text("Please choose date");
		$("#txtDate").focus();
		$("#showDayError").css("color","#F00");
		return false;
	}  else {
		$("#showDayError").text("");
		return true;
	}
}
function refresh() {
	$("#txtName").val("");
	$("#txtPass").val("");
	$("#txtEmail").val("");
	$("#txtDate").val("");
    $("#showUserError").text("");
	$("#showPassError").text("");
	$("#showEmailError").text("");
	$("#showDayError").text("");
}
});