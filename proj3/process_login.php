<?php

//  Revankar, Akash
// 	jadrn054
// 	Project #3
// 	Fall 2017
//
// 	handler for roster report generation

	include('overwatch.php');
	
	check_post_only();
	if(is_valid_password($_POST['password']))
		write_report();
	else {
		write_login_error();
	}
?>