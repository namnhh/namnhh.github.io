<?php
//mysql_connect("localhost","root","");
//mysql_select_db("user");
mysql_connect("sql205.byethost16.com","b16_19945378","123456");
mysql_select_db("b16_19945378_user");
mysql_query(" SET NAMES 'utf-8' ");
function insert($user,$pass,$email,$birthday)
{
	mysql_query("SET NAMES 'UTF8'");
	$qr = "
		INSERT INTO `use`
		VALUE
		 (null,'$user','$pass','$email','$birthday')
	";
	 return mysql_query($qr);
}
function checkUser($us) {
    mysql_query("SET NAMES 'UTF8'");
	 $qr =" 
	 SELECT * 
	 From `use` WHERE  user = '$us' 	 
	 ";
	 return mysql_query($qr);
}
if(isset ($_GET['User']))
{
	$row = checkUser($_GET['User']);
	$r = mysql_num_rows($row);
	if ($r==1) echo 'false';
	else if($r==0)
	{  
	  echo 'true';
	  insert($_GET['User'],$_GET['Pass'],$_GET['Email'],$_GET['Date']);
	}
}
?>