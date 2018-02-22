<!DOCTYPE html>
<html>
<!--
	Revankar, Akash
	jadrn054
	Project #3
	Fall 2017

	sign-up page
-->
	<head>
		<meta charset="UTF-8">
		
		<link rel="icon" type="image/png" href="favicon.png" />
		
		<link href="https://fonts.googleapis.com/css?family=Rajdhani:400,600|Prompt:700i" rel="stylesheet">
		<link rel="stylesheet" href="css/style.css">
		
		<script src="http://jadran.sdsu.edu/jquery/jquery.js"></script>
		<script src="script/script.js"></script>
		
		<title>Sign Up | SDSU Marathon</title>
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
					<a href="#" id="sign_up">Sign Up</a>
				</li>
			</ul>
		
			<div class="signup_form_container">
				<form id="signup_form" name="signup_form" action="process_request.php" method="post" enctype="multipart/form-data">
					<h2>Enter Your Details</h2>
					<div id="note">(All fields marked <span class="required">*</span> are mandatory. You will not be able to Submit the form unless you fill in all mandatory fields.)</div>
					<table>
						<tr>
							<td>
								<label for="pic">Upload Your Picture<span class="required">*</span></label>
							</td>
							<td colspan="2">
								<input type="file" name="pic" id="pic" value="" accept="image/*">
								<br>
								<div id="img_max_size">Max Size: 1 MB</div>
								<div class="errors"><span id="pic_error"></span></div>
							</td>
						</tr>
					
						<tr>
							<td>
								<label for="firstname">First Name<span class="required">*</span></label>
								<br>
								<input type="text" name="firstname" value="">
								<br>
								<div class="errors"><span id="firstname_error"></span></div>
							</td>
							<td>
								<label for="middlename">Middle Name<span class="required hidden">*</span></label>
								<br>
								<input type="text" name="middlename" value="">
								<br>
								<div class="errors"><span id="middlename_error"></span></div>
							</td>
							<td>
								<label for="lastname">Last Name<span class="required">*</span></label>
								<br>
								<input type="text" name="lastname" value="">
								<br>
								<div class="errors"><span id="lastname_error"></span></div>
							</td>
						</tr>
				
						<tr>
							<td>
								<label for="addrline1">Address Line 1<span class="required">*</span></label>
							</td>
							<td colspan="2">
								<input type="text" name="addrline1" value="" placeholder="Block No., Street Name, etc.">
								<br>
								<div class="errors"><span id="addrline1_error"></span></div>
							</td>
						</tr>
				
						<tr>
							<td>
								<label for="addrline2">Address Line 2<span class="required hidden">*</span></label>
							</td>
							<td colspan="2">
								<input type="text" name="addrline2" value="" placeholder="Apt/Suite/House/Door No., etc.">
								<br>
								<div class="errors"><span id="addrline2_error"></span></div>
							</td>
						</tr>
				
						<tr>
							<td>
								<label for="city">City<span class="required">*</span></label>
								<br>
								<input type="text" name="city" value="">
								<br>
								<div class="errors"><span id="city_error"></span></div>
							</td>
							<td>
								<label for="state">State<span class="required">*</span></label>
								<br>
								<input type="text" name="state" value="" placeholder="eg. CA">
								<br>
								<div class="errors"><span id="state_error"></span></div>
							</td>
							<td>
								<label for="zip">Zip Code<span class="required">*</span></label>
								<br>
								<input type="text" name="zip" value="" maxlength="5" placeholder="5-digit">
								<br>
								<div class="errors"><span id="zip_error"></span></div>
							</td>
						</tr>
				
						<tr>
							<td>
								<label for="phone">Primary Phone<span class="required">*</span></label>
							</td>
							<td colspan="2">
								<input type="text" name="phone" value="" placeholder="10-digit Phone Number">
								<br>
								<div class="errors"><span id="phone_error"></span></div>
							</td>
						</tr>
				
						<tr>
							<td>
								<label for="emailid">Email Id<span class="required">*</span></label>
							</td>
							<td colspan="2">
								<input type="email" name="emailid" value="" placeholder="user@domain.com">
								<br>
								<div class="errors"><span id="emailid_error"></span></div>
							</td>
						</tr>
				
						<tr>
							<td>
								<label for="gender">Gender<span class="required">*</span></label>
							</td>
							<td colspan="2">
								<input type="radio" name="gender" id="male" value="Male">
								<label for="male">Male</label>&nbsp;&nbsp;
								<input type="radio" name="gender" id="female" value="Female">
								<label for="female">Female</label>&nbsp;&nbsp;
								<input type="radio" name="gender" id="other" value="Other">
								<label for="other">Other</label>
								<div class="errors"><span id="gender_error"></span></div>
							</td>
						</tr>
				
						<tr>
							<td>
								<label for="dob">Date of Birth<span class="required">*</span></label>
							</td>
							<td colspan="2">
								<input type="text" name="dob" id="dob" value="" placeholder="mm/dd/yyyy">
								<br>
								<div class="errors"><span id="dob_error"></span></div>
							</td>
						</tr>
				
						<tr>
							<td>
								<label for="medcond">Medical Conditions<span class="required hidden">*</span></label>
							</td>
							<td colspan="2">
								<textarea name="medcond" id="medcond" rows="4" cols="50" maxlength="100" placeholder="Specify medical conditions, if any. Max 100 characters."></textarea>
								<div id="char_count"></div>
								<br>
								<div class="errors"><span id="medcond_error"></span></div>
							</td>
						</tr>
				
						<tr>
							<td>
								<label for="explvl">Experience Level<span class="required">*</span></label>
							</td>
							<td colspan="2">
								<input type="radio" name="explvl" id="expert" value="Expert">
								<label for="expert">Expert</label>&nbsp;&nbsp;
								<input type="radio" name="explvl" id="expr" value="Experienced">
								<label for="expr">Experienced</label>&nbsp;&nbsp;
								<input type="radio" name="explvl" id="novice" value="Novice">
								<label for="novice">Novice</label>
								<br>
								<div class="errors"><span id="explvl_error"></span></div>
							</td>
						</tr>
				
						<tr>
							<td>
								<label for="category">Category<span class="required">*</span></label>
							</td>
							<td colspan="2">
								<input type="radio" name="category" id="teen" value="Teen">
								<label for="teen">Teen</label>&nbsp;&nbsp;
								<input type="radio" name="category" id="adult" value="Adult">
								<label for="adult">Adult</label>&nbsp;&nbsp;
								<input type="radio" name="category" id="senior" value="Senior">
								<label for="senior">Senior</label>
								<div class="errors"><span id="category_error"></span></div>
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
		
			<div class="footer">
				Copyright &copy; 2017 | Akash Revankar
			</div>
		</div>
	</body>
</html>