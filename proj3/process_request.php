<?php

	// Revankar, Akash
	// jadrn054
	// Project #3
	// Fall 2017
	//
	// handler for processing form data and update to database

	include('overwatch.php');

	check_post_only();
	$params = process_parameters();
	validate_data($params);
	store_data_in_db($params);
?>   