<?php

	// Revankar, Akash
	// jadrn054
	// Project #3
	// Fall 2017
	//
	// password generator

if($_GET) exit;
if($_POST) exit;

$pass = array('cs545','qawsed','aqswde');

#### Using SHA256 #######
$salt='$5$R$4%abcdfecab86@';  # 12 character salt starting with $1$

for($i=0; $i<count($users); $i++) 
        echo crypt($pass[$i],$salt)."\n";
?>
