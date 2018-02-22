<!DOCTYPE html>
<html>
<!--
	Revankar, Akash
	jadrn054
	Project #3
	Fall 2017

	login page to generate roster report
-->
	<head>
		<meta charset="UTF-8">
		
		<link rel="icon" type="image/png" href="favicon.png" />
		
		<link href="https://fonts.googleapis.com/css?family=Rajdhani:400,600|Prompt:700i" rel="stylesheet">
		<link rel="stylesheet" href="css/style.css">
		
		<script src="http://jadran.sdsu.edu/jquery/jquery.js"></script>
		<script src="script/script.js"></script>
		
		<title>Report | SDSU Marathon</title>
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
								<div class="errors"><span id="password_error"></span></div>
							</td>
						</tr>
					</table>
				
					<div class="buttons">
						<button type="submit" id="get_report" form="login_form">Get Report</button>
					</div>
				</form>
			</div>
		
			<div class="footer">
				Copyright &copy; 2017 | Akash Revankar
			</div>
		</div>
	</body>
</html>