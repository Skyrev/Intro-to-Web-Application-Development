<?php

/*
	Revankar, Akash
	jadrn054
	Project #3
	Fall 2017

	handler for form processing and database operations
*/

$bad_chars = array('$','%','?','<','>','php');
$error_msg = array("","","","","","","","","","","","","","","","");
$error_class = array("","","","","","","","","","","","","","","","");

function check_post_only() {
	if(!$_POST) {
	    write_error_page('<h2>"THOU SHALL NOT PASS!"</h2><br>Content available only to personnel with valid credentials.');
	    exit;
	}
}

function write_header($title) {
	print <<<ENDBLOCK
		<!DOCTYPE html>
		<html>
		<!--
			Revankar, Akash
			jadrn054
			Project #3
			Fall 2017
		-->
			<head>
				<meta charset="UTF-8">
		
				<link rel="icon" type="image/png" href="favicon.png" />
		
				<link href="https://fonts.googleapis.com/css?family=Rajdhani:400,600|Prompt:700i" rel="stylesheet">
				<link rel="stylesheet" href="css/style.css">
		
				<script src="http://jadran.sdsu.edu/jquery/jquery.js"></script>
				<script src="script/script.js"></script>
		
				<title>$title | SDSU Marathon</title>
			</head>

			<body>
				<div class="container">
			    	<div class="banner">
						<h1><a href="index.html">SDSU<img id="logo" src="images/logo.png" alt="" width="70px" height="auto"/>MARATHON</a></h1>
					</div>
		
					<ul class="menu_bar">
						<li class="menu_item">
							<a href="index.html" id="home">Home</a>
						</li>
						<li class="menu_item">
							<a href="signup.php" id="sign_up">Sign Up</a>
						</li>
					</ul>
ENDBLOCK;
}

function write_footer() {
    print <<<ENDBLOCK
			<div class="footer">
				Copyright &copy; 2017 | Akash Revankar
			</div>
		</div>
	</body>
</html>
ENDBLOCK;
}

function write_error_page($msg) {
    write_header('Error');
    echo '<div class="msg_container">', $msg, '</div>';
    write_footer();
}

function write_login_error() {
	write_header('Report');
	print <<<ENDBLOCK
		<div class="login_form_container">
			<form id="login_form" name="login_form" action="process_login.php" method="post" enctype="multipart/form-data">
				<h2>Enter Password to Access Report</h2>
				
				<table>
					<tr>
						<td>
							<label for="password">Password<span class="required">*</span></label>
						</td>
						<td>
							<input type="password" name="password" id="password">
							<br>
							<div class="errors"><span id="password_error" class="error_background">Invalid Password</span></div>
						</td>
					</tr>
				</table>
			
				<div class="buttons">
					<button type="submit" id="get_report" form="login_form">Get Report</button>
				</div>
			</form>
		</div>
ENDBLOCK;
	write_footer();
};

function write_success_page() {
	write_header('Registration Success');
	write_success();
	write_footer();
}

function write_success() {
	$_POST['phone'] = process_phone_no($_POST['phone']);
	$extn = end(explode('.', $_FILES['pic']['name']));
	$filename = 'img_'.$_POST['phone'].'.'.$extn;
	print <<<ENDBLOCK
		<div class="msg_container">
			<h2>Registered succesfully with the below details!</h2>
			<table id="user_details">
				<tr>
					<td colspan="2">
						<img id="runner_image" src="img_uploads/$filename" alt="Runner Image" width="150px" height="auto">
					</td>
				</tr>
				<tr>
					<td class="details_col_1">First Name</td><td class="details_col_2">$_POST[firstname]</td>
				</tr>
				<tr>
					<td class="details_col_1">Middle Name</td><td class="details_col_2">$_POST[middlename]</td>
				</tr>
				<tr>
					<td class="details_col_1">Last Name</td><td class="details_col_2">$_POST[lastname]</td>
				</tr>
				<tr>
					<td class="details_col_1">Address Line 1</td><td class="details_col_2">$_POST[addrline1]</td>
				</tr>
				<tr>
					<td class="details_col_1">Address Line 2</td><td class="details_col_2">$_POST[addrline2]</td>
				</tr>
				<tr>
					<td class="details_col_1">City</td><td class="details_col_2">$_POST[city]</td>
				</tr>
				<tr>
					<td class="details_col_1">State</td><td class="details_col_2">$_POST[state]</td>
				</tr>
				<tr>
					<td class="details_col_1">Zip</td><td class="details_col_2">$_POST[zip]</td>
				</tr>
				<tr>
					<td class="details_col_1">Phone</td><td class="details_col_2">$_POST[phone]</td>
				</tr>
				<tr>
					<td class="details_col_1">Email Id</td><td class="details_col_2">$_POST[emailid]</td>
				</tr>
				<tr>
					<td class="details_col_1">Gender</td><td class="details_col_2">$_POST[gender]</td>
				</tr>
				<tr>
					<td class="details_col_1">Date of Birth</td><td class="details_col_2">$_POST[dob]</td>
				</tr>
				<tr>
					<td class="details_col_1">Medical Condition</td><td class="details_col_2">$_POST[medcond]</td>
				</tr>
				<tr>
					<td class="details_col_1">Expert Level</td><td class="details_col_2">$_POST[explvl]</td>
				</tr>
				<tr>
					<td class="details_col_1">Category</td><td class="details_col_2">$_POST[category]</td>
				</tr>
				
			</table>
		</div>
ENDBLOCK;
}



function write_form_error_page($msg) {
    write_header('Sign Up');
    write_form($msg);
    write_footer();
}

function write_form($msg) {
	global $error_msg, $error_class;
	
	$filename = $_FILES['pic']['name'];
	$gender = array('','','');
	$explvl = array('','','');
	$category = array('','','');
	
	switch ($_POST['gender']) {
	    case 'Male':
			$gender[0] = 'checked';
	        break;
	    case 'Female':
			$gender[1] = 'checked';
	        break;
	    case 'Other':
			$gender[2] = 'checked';
	        break;
	    default:
	}
	switch ($_POST['explvl']) {
	    case 'Expert':
			$explvl[0] = 'checked';
	        break;
	    case 'Experienced':
			$explvl[1] = 'checked';
	        break;
	    case 'Novice':
	        $explvl[2]= 'checked';
	        break;
	    default:
	}
	switch ($_POST['category']) {
	    case 'Teen':
			$category[0] = 'checked';
	        break;
	    case 'Adult':
			$category[1] = 'checked';
	        break;
	    case 'Senior':
			$category[2] = 'checked';
	        break;
	    default:
	}
    print <<<ENDBLOCK
		<div class="signup_form_container">
			<form id="signup_form" name="signup_form" action="process_request.php" method="post" enctype="multipart/form-data">
				<h2>Enter Your Details</h2>
				<div id="note">(All fields marked <span class="required">*</span> are mandatory. You will not be able to Submit the form unless you fill in all mandatory fields.)</div>
				<div class="error_background form_error">$msg</div>
				<table>
					<tr>
						<td>
							<label for="pic">Upload Your Picture<span class="required">*</span></label>
						</td>
						<td colspan="2">
							<input type="file" name="pic" id="pic" value="$filename" accept="image/*">
							<br>
							<div id="img_max_size">Max Size: 1 MB</div>
							<div class="errors"><span id="pic_error" $error_class[0]>$error_msg[0]</span></div>
						</td>
					</tr>
				
					<tr>
						<td>
							<label for="firstname">First Name<span class="required">*</span></label>
							<br>
							<input type="text" name="firstname" value="$_POST[firstname]">
							<br>
							<div class="errors"><span id="firstname_error" $error_class[1]>$error_msg[1]</span></div>
						</td>
						<td>
							<label for="middlename">Middle Name<span class="required hidden">*</span></label>
							<br>
							<input type="text" name="middlename" value="$_POST[middlename]">
							<br>
							<div class="errors"><span id="middlename_error" $error_class[2]>$error_msg[2]</span></div>
						</td>
						<td>
							<label for="lastname">Last Name<span class="required">*</span></label>
							<br>
							<input type="text" name="lastname" value="$_POST[lastname]">
							<br>
							<div class="errors"><span id="lastname_error" $error_class[3]>$error_msg[3]</span></div>
						</td>
					</tr>
			
					<tr>
						<td>
							<label for="addrline1">Address Line 1<span class="required">*</span></label>
						</td>
						<td colspan="2">
							<input type="text" name="addrline1" placeholder="Block No., Street Name, etc." value="$_POST[addrline1]">
							<br>
							<div class="errors"><span id="addrline1_error" $error_class[4]>$error_msg[4]</span></div>
						</td>
					</tr>
			
					<tr>
						<td>
							<label for="addrline2">Address Line 2<span class="required hidden">*</span></label>
						</td>
						<td colspan="2">
							<input type="text" name="addrline2" placeholder="Apt/Suite/House/Door No., etc." value="$_POST[addrline2]">
							<br>
							<div class="errors"><span id="addrline2_error" $error_class[5]>$error_msg[5]</span></div>
						</td>
					</tr>
			
					<tr>
						<td>
							<label for="city">City<span class="required">*</span></label>
							<br>
							<input type="text" name="city" value="$_POST[city]">
							<br>
							<div class="errors"><span id="city_error" $error_class[6]>$error_msg[6]</span></div>
						</td>
						<td>
							<label for="state">State<span class="required">*</span></label>
							<br>
							<input type="text" name="state" placeholder="eg. CA" value="$_POST[state]">
							<br>
							<div class="errors"><span id="state_error" $error_class[7]>$error_msg[7]</span></div>
						</td>
						<td>
							<label for="zip">Zip Code<span class="required">*</span></label>
							<br>
							<input type="text" name="zip" maxlength="5" placeholder="5-digit" value="$_POST[zip]">
							<br>
							<div class="errors"><span id="zip_error" $error_class[8]>$error_msg[8]</span></div>
						</td>
					</tr>
			
					<tr>
						<td>
							<label for="phone">Primary Phone<span class="required">*</span></label>
						</td>
						<td>
							<input type="text" name="phone" placeholder="10-digit Phone Number" value="$_POST[phone]">
							<br>
							<div class="errors"><span id="phone_error" $error_class[9]>$error_msg[9]</span></div>
						</td>
					</tr>
			
					<tr>
						<td>
							<label for="emailid">Email Id<span class="required">*</span></label>
						</td>
						<td colspan="2">
							<input type="email" name="emailid" placeholder="user@domain.com" value="$_POST[emailid]">
							<br>
							<div class="errors"><span id="emailid_error" $error_class[10]>$error_msg[10]</span></div>
						</td>
					</tr>
			
					<tr>
						<td>
							<label for="gender">Gender<span class="required">*</span></label>
						</td>
						<td colspan="2">
							<input type="radio" name="gender" id="male" value="Male" $gender[0] >
							<label for="male">Male</label>&nbsp;&nbsp;
							<input type="radio" name="gender" id="female" value="Female" $gender[1] >
							<label for="female">Female</label>&nbsp;&nbsp;
							<input type="radio" name="gender" id="other" value="Other" $gender[2] >
							<label for="other">Other</label>
							<div class="errors"><span id="gender_error" $error_class[11]>$error_msg[11]</span></div>
						</td>
					</tr>
			
					<tr>
						<td>
							<label for="dob">Date of Birth<span class="required">*</span></label>
						</td>
						<td colspan="2">
							<input type="text" name="dob" id="dob" placeholder="mm/dd/yyyy" value="$_POST[dob]">
							<br>
							<div class="errors"><span id="dob_error" $error_class[12]>$error_msg[12]</span></div>
						</td>
					</tr>
			
					<tr>
						<td>
							<label for="medcond">Medical Conditions<span class="required hidden">*</span></label>
						</td>
						<td colspan="2">
							<textarea name="medcond" id="medcond" rows="4" cols="50" maxlength="100" placeholder="Specify medical conditions, if any. Max 100 characters.">$_POST[medcond]</textarea>
							<br>
							<div class="errors"><span id="medcond_error" $error_class[13]>$error_msg[13]</span></div>
						</td>
					</tr>
			
					<tr>
						<td>
							<label for="explvl">Experience Level<span class="required">*</span></label>
						</td>
						<td colspan="2">
							<input type="radio" name="explvl" id="expert" value="Expert" $explvl[0] >
							<label for="expert">Expert</label>&nbsp;&nbsp;
							<input type="radio" name="explvl" id="expr" value="Experienced" $explvl[1] >
							<label for="expr">Experienced</label>&nbsp;&nbsp;
							<input type="radio" name="explvl" id="novice" value="Novice" $explvl[2] >
							<label for="novice">Novice</label>
							<br>
							<div class="errors"><span id="explvl_error" $error_class[14]>$error_msg[14]</span></div>
						</td>
					</tr>
			
					<tr>
						<td>
							<label for="category">Category<span class="required">*</span></label>
						</td>
						<td colspan="2">
							<input type="radio" name="category" id="teen" value="Teen" $category[0] >
							<label for="teen">Teen</label>&nbsp;&nbsp;
							<input type="radio" name="category" id="adult" value="Adult" $category[1] >
							<label for="adult">Adult</label>&nbsp;&nbsp;
							<input type="radio" name="category" id="senior" value="Senior" $category[2] >
							<label for="senior">Senior</label>
							<div class="errors"><span id="category_error" $error_class[15]>$error_msg[15]</span></div>
						</td>
					</tr>
				</table>
			
				<div class="buttons">
					<button type="reset" id="reset" form="signup_form" title="Clear entered data">Clear Form</button>
					<button type="submit" id="submit" form="signup_form">Submit</button>
				</div>
			</form>
		</div>
		
		<div id="bottom_note">In case you are having issues with filling this form despite providing proper details, shoot a mail at <span class="highlight">marathon@sdsu.edu</span> . We'll get back to you at the earliest.</div>
ENDBLOCK;
}

function write_report() {
	write_header('Roster Report');
	
    $db = get_db_handle();
	$i = 0;
	$category = array("Teen","Adult","Senior");
	
	echo "<div class='report_container'>";
	echo "<h2>Roster Report</h2>";
	echo "Below is the list of participants arranged by Category (Teen, Adult, Senior)";
	while($i != 3) {
		$sql = "SELECT pic, lastname, firstname, dob, explvl FROM person WHERE category='$category[$i]' ORDER BY lastname;";
		$result = mysqli_query($db,$sql);
		echo "<h2 class='report_header'>$category[$i]"."s</h2>";
		if($result->num_rows > 0) {
			echo "<table class='report_table'>";
			while($row = mysqli_fetch_row($result)) {
				
				echo "<tr><td rowspan='3' class='details_col_1'><img src='img_uploads/$row[0]' alt='Runner Image' width='auto' height='100px'></td>";
				echo "<td class='details_col_2'>Name: $row[1], $row[2]</td></tr>";
				echo "<tr><td class='details_col_2'>Age: ",get_age($row[3])," years</td></tr>";
				echo "<tr><td class='details_col_2'>Experience Level: $row[4]</td></tr>";
			}
			echo "</table>";
		}
		else {
			echo "No records found.";
		}
		$i++;
	}
	echo "</div>";
    close_connector($db);
	
	write_footer();
}
    
function get_db_handle() {
    $server = 'opatija.sdsu.edu:3306';
    $user = 'jadrn054';
    $password = 'strawberry';
    $database = 'jadrn054';   
        
    if(!($db = mysqli_connect($server, $user, $password, $database))) {
        write_error_page('SQL ERROR: Connection failed: '.mysqli_error($db).'<br>Please try again sometime later. If problem persists, drop a mail to marathon@sdsu.edu');
    }
    return $db;
}        
       
function close_connector($db) {
    mysqli_close($db);
}

function process_parameters() {
    global $bad_chars;
    $params = array();
	$params[] = trim(str_replace($bad_chars, "",$_FILES['pic']['name']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['firstname']));
	$params[] = trim(str_replace($bad_chars, "",$_POST['middlename']));
	$params[] = trim(str_replace($bad_chars, "",$_POST['lastname']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['addrline1']));
	$params[] = trim(str_replace($bad_chars, "",$_POST['addrline2']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['city']));
    $params[] = strtoupper(trim(str_replace($bad_chars, "",$_POST['state'])));
    $params[] = trim(str_replace($bad_chars, "",$_POST['zip']));
	$params[] = trim(str_replace($bad_chars, "",$_POST['phone']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['emailid']));
	if(!array_key_exists("gender", $_POST)) $_POST['gender'] = "";
	$params[] = trim(str_replace($bad_chars, "",$_POST['gender']));	
	$params[] = trim(str_replace($bad_chars, "",$_POST['dob']));
	$params[] = trim(str_replace($bad_chars, "",$_POST['medcond']));
	if(!array_key_exists("explvl", $_POST)) $_POST['explvl'] = "";
	$params[] = trim(str_replace($bad_chars, "",$_POST['explvl']));
	if(!array_key_exists("category", $_POST)) $_POST['category'] = "";
	$params[] = trim(str_replace($bad_chars, "",$_POST['category']));
	
    return $params;
}

function validate_data($params) {
    global $error_msg, $error_class;
	$image_error_msg = is_image_invalid($params[0]);
    if(strlen($image_error_msg) != 0) {
        $error_msg[0] = $image_error_msg;
		$error_class[0] = 'class="error_background"';
	}
	else {
        $error_msg[0] = "";
		$error_class[0] = "";
	}
	
    if(strlen($params[1]) == 0) {
        $error_msg[1] = "First Name cannot be empty.";
		$error_class[1] = 'class="error_background"';
	}
	else {
        $error_msg[1] = "";
		$error_class[1] = "";
	}
	
    $error_msg[2] = "";
	$error_class[2] = "";
	
	if(strlen($params[3]) == 0) {
        $error_msg[3] = "Last Name cannot be empty.";
		$error_class[3] = 'class="error_background"';
	}
	else {
        $error_msg[3] = "";
		$error_class[3] = "";
	}
	
	if(strlen($params[4]) == 0) {
        $error_msg[4] = "Address Line 1 cannot be empty.";
		$error_class[4] = 'class="error_background"';
	}
	else {
        $error_msg[4] = "";
		$error_class[4] = "";
	}
	
    $error_msg[5] = "";
	$error_class[5] = "";
	
	if(strlen($params[6]) == 0) {
        $error_msg[6] = "City cannot be empty.";
		$error_class[6] = 'class="error_background"';
	}
	else {
        $error_msg[6] = "";
		$error_class[6] = "";
	}
	
	if(strlen($params[7]) == 0) {
        $error_msg[7] = "State cannot be empty.";
		$error_class[7] = 'class="error_background"';
	}
	elseif(!is_valid_state($params[7])) {
		$error_msg[7] = "Enter valid State (2-letters eg. CA).";
		$error_class[7] = 'class="error_background"';
	}
	else {
        $error_msg[7] = "";
		$error_class[7] = "";
	}
	
	if(strlen($params[8]) == 0) {
        $error_msg[8] = "Zip Code cannot be empty.";
		$error_class[8] = 'class="error_background"';
	}
	elseif(!is_valid_zip($params[8])) {
		$error_msg[8] = "Enter a valid 5-digit zip code.";
		$error_class[8] = 'class="error_background"';
	}
	else {
        $error_msg[8] = "";
		$error_class[8] = "";
	}
	
	if(strlen($params[9]) == 0) {
        $error_msg[9] = "Phone number cannot be empty.";
		$error_class[9] = 'class="error_background"';
	}
	elseif(!is_valid_phone($params[9])) {
		$error_msg[9] = "Enter a valid 10-digit phone number. ";
		$error_class[9] = 'class="error_background"';
	}
	elseif(is_duplicate('phone',$params[9])) {
		$error_msg[9] = "Phone no. already registered. Please enter another no.";
		$error_class[9] = 'class="error_background"';
	}
	else {
        $error_msg[9] = "";
		$error_class[9] = "";
	}
	
	if(strlen($params[10]) == 0) {
        $error_msg[10] = "Email Id cannot be empty.";
		$error_class[10] = 'class="error_background"';
	}
	elseif(!filter_var($params[10], FILTER_VALIDATE_EMAIL)) {
		$error_msg[10] = "Enter a valid email id.";
		$error_class[10] = 'class="error_background"';
	}
	else {
        $error_msg[10] = "";
		$error_class[10] = "";
	}

	if(strlen($params[11]) == 0) {
        $error_msg[11] = "Please select one option.";
		$error_class[11] = 'class="error_background"';
	}
	else {
        $error_msg[11] = "";
		$error_class[11] = "";
	}
	
	if(strlen($params[12]) == 0) {
        $error_msg[12] = "Date of Birth cannot be empty.";
		$error_class[12] = 'class="error_background"';
	}
	elseif(!is_valid_date($params[12])) {
		$error_msg[12] = "Enter a valid date! Enter date in mm/dd/yyyy format.";
		$error_class[12] = 'class="error_background"';
	}
	elseif(get_age($params[12]) < 13 || get_age($params[12]) > 90) {
		$error_msg[12] = "You should be between 13 and 90 to participate.";
		$error_class[12] = 'class="error_background"';
	}
	else {
        $error_msg[12] = "";
		$error_class[12] = "";
	}
	
    $error_msg[13] = "";
	$error_class[13] = "";
	
	if(strlen($params[14]) == 0) {
        $error_msg[14] = "Please select one option.";
		$error_class[14] = 'class="error_background"';
	}
	else {
        $error_msg[14] = "";
		$error_class[14] = "";
	}
	
	if(strlen($params[15]) == 0) {
        $error_msg[15] = "Please select one option.";
		$error_class[15] = 'class="error_background"';
	}
	else {
        $error_msg[15] = "";
		$error_class[15] = "";
	}
	      
    foreach($error_msg as $i)
		if(strlen($i) != 0) {
	        write_form_error_page('Please resolve error(s).');
	        exit;
		}
}

function is_image_invalid($msg) {
    $UPLOAD_DIR = 'img_uploads/';
    $file_name = $_FILES['pic']['name'];
    $ext = end(explode('.', $_FILES['pic']['name']));
	
	if(strlen($_FILES['pic']['name']) == 0)
		return "Please upload your picture.";
    else if($_FILES['pic']['size'] > 1000000) {
		return "File size exceeds 1 MB. Upload a smaller image.";
    } 
    elseif(!((strcasecmp($ext, "jpg") == 0) || (strcasecmp($ext, "jpeg") == 0)
		   || (strcasecmp($ext, "png") == 0) || (strcasecmp($ext, "bmp") == 0)
		   || (strcasecmp($ext, "svg") == 0) || (strcasecmp($ext, "gif") == 0)
		   || (strcasecmp($ext, "tiff") == 0))) {
        return "Only .jpg, .jpeg, .png, .bmp, .svg, .gif, .tiff image formats are allowed. Upload another image.";
    }
	return "";      
}

function is_valid_state($value) {
	$stateList = array("AK","AL","AR","AZ","CA","CO","CT","DC",
	        "DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA",
	        "MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ",
	        "NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX",
	        "UT","VA","VT","WA","WI","WV","WY");
		
		foreach($stateList as $state) 
	    	if(strcasecmp($state, $value) == 0)
	        	return true;
	    return false;
}

function is_valid_zip($value) {
	$regex = '/^[1-9]{1}[0-9]{4}$/';
	return preg_match($regex, $value);
}

function is_valid_phone($value) {
	$regex1 = '/^[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{4}$/'; 
	$regex2 = '/^[0-9]{10}$/';
	return preg_match($regex1, $value) || preg_match($regex2, $value);
}

function process_phone_no($value) {
	if(count(explode('-', $value)) == 1)
		return substr($value,0,3)."-".substr($value,3,3)."-".substr($value,6,4);
	return $value;
}

function is_duplicate($field, $value) {
	if(strcasecmp($field,'phone') == 0 && count(explode('-',$value)) != 3) {
		$value = process_phone_no($value);
	}
    $db = get_db_handle();
    $sql = "SELECT firstname FROM person WHERE $field='$value';";
	$count = mysqli_num_rows(mysqli_query($db,$sql));
	close_connector($db);
	
	if($count > 0)
		return true;
	return false;
}

function is_valid_date($value) {
	$date = explode('/', $value);
	if(count($date) != 3)
		return false;
    $day = $date[1]; 
    $month = $date[0];
    $year = $date[2];
    
    return checkdate($month, $day, $year);
}

function get_age($value) {
	# borrowed from http://jsfiddle.net/codeandcloud/n33RJ/
    $today = explode('/', date('m/d/Y'));
    $birthDate = explode('/', $value);
    $age = $today[2] - $birthDate[2];
    $m = $today[0] - $birthDate[0];
    if ($m < 0 || ($m === 0 && $today[1] < $birthDate[1])) {
        $age--;
    }
	return $age;
}


function is_valid_password($password) {
	$raw = file_get_contents('passwords.dat');
	$data = explode("\n",$raw);

	foreach($data as $item) {
	    if(crypt($password,$item) === $item)
			return true;           
	}
	return false;
}
    
function store_data_in_db($params) {
    $db = get_db_handle();
	
	$params[9] = process_phone_no($params[9]);
	$extn = end(explode('.', $params[0]));
	$filename = 'img_'.$params[9].'.'.$extn;
	
    $sql = "INSERT INTO person ".
    "VALUES('$filename','$params[1]','$params[2]','$params[3]','$params[4]','$params[5]',".
	"'$params[6]','$params[7]','$params[8]','$params[9]','$params[10]','$params[11]',".
	"'$params[12]','$params[13]','$params[14]','$params[15]');";
		
	if (mysqli_query($db,$sql)) {
		move_uploaded_file($_FILES['pic']['tmp_name'], 'img_uploads/'.$filename);
		write_success_page();
	}
	else {
		write_form_error_page('An error occurred. Please try again sometime later.<br>If problem persists, drop a mail to <span class="highlight">marathon@sdsu.edu</span>');
	}
	close_connector($db);
}
        
?>