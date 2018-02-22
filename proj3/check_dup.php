<?php

//  Revankar, Akash
// 	jadrn054
// 	Project #3
// 	Fall 2017
//
// 	handler for duplicate phone no.

	include('overwatch.php');
	
	$db = get_db_handle();
	$sql = "SELECT * FROM person WHERE phone='".$_GET['phone']."';";
	$how_many = mysqli_num_rows($result=mysqli_query($db, $sql));
	close_connector($db);
	if($how_many > 0)
	    echo "dup";
	else if($how_many == 0)
	    echo "OK";
	else
	    echo "ERROR, failure ".$how_many;
?>