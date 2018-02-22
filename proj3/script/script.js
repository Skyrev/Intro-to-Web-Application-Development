/*
	Revankar, Akash
	jadrn054
	Project #3
	Fall 2017

	script.js for client-side behavior and form validation
*/

function isEmpty(value) {
	return $.trim(value).length == 0;
}

function isValidState(state) {                                
	var stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC",
        "DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA",
        "MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ",
        "NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX",
        "UT","VA","VT","WA","WI","WV","WY");
		
	for(var i=0; i < stateList.length; i++) 
    	if(stateList[i] == $.trim(state))
                return true;
    return false;
}

function isValidZip(value) {
	var regex = /^[1-9]{1}[0-9]{4}$/;
	return regex.test($.trim(value))
}

function isValidPhone(value) {
	var regex1 = /^[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{4}$/; 
	var regex2 = /^[0-9]{10}$/;
	return regex1.test($.trim(value)) || regex2.test($.trim(value))
}

function isValidEmail(value) {
	var regex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
	return regex.test(value);
}

function isValidDate(value) {
	var date = value.split('/');
    var day = date[1]; 
    var month = date[0];
    var year = date[2];
    
    // now turn the three values into a Date object and check them
    var checkDate = new Date(year, month-1, day);    
    var checkDay = checkDate.getDate();
    var checkMonth = checkDate.getMonth()+1;
    var checkYear = checkDate.getFullYear();
    
    if(day == checkDay && month == checkMonth && year == checkYear)
        return true;
    else
        return false;
}

function getAge(value) {
	//borrowed from http://jsfiddle.net/codeandcloud/n33RJ/
    var today = new Date();
    var birthDate = new Date(value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
	return age;
}

function isValidFileFormat(name) {
	var length = name.length;
	var dot = name.lastIndexOf('.');
	var ext = name.slice(dot+1, dot+4 );
	if (ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "gif" || ext == "tiff" || ext == "svg" || ext == "bmp") {
		return true;
	}
	return false;
}

function isChecked(radio) {
	for(i=0; i<radio.length; i++) {
		if ($(radio[i]).prop('checked')) {
			return true;
		}
	}
}

function disableSubmit() {
	$(':submit').prop('disabled', 'disabled');
	$(':submit').prop('title', 'Fill all mandatory fields to submit');
	$(':submit').addClass('disabled');
}

// enable Submit button if there are no errors
function enableSubmit() {
	var idx = $('.errors span');
	var idy = $('input');
	var idr = $('[type="radio"]');
	count = 0;
	
	for(i=0; i<idx.length; i++) {
		if ($(idx[i]).text().length != 0) {
			disableSubmit();
			return;
		}
	}
	for(i=0; i<idy.length; i++) {
		if (i != 2 && i != 5 && $(idy[i]).val().length == 0) {
			disableSubmit();
			return;
		}
	}
	
	for(i=0; i<idr.length; i++) {
		if ($(idr[i]).prop('checked')) {
			count++;
		}
	}
	
	if (count != 3) {
		disableSubmit();
		return;
	}
	
	$(':submit').prop("disabled", "");
	$(':submit').prop('title', 'Click to submit form');
	$(':submit').removeClass('disabled');
}

// clear all error messages
function clearErrors() {
	var idx = $('.errors span');
	for(i=0; i<idx.length; i++) {
		$(idx[i]).text("");
		$(idx[i]).removeClass('error_background');
	}
	if($('div.error_background').length != 0)
		$('div.error_background').remove();
}

function clearData() {
	var idx = $('input');
	for(i=0; i<idx.length; i++) {
		$(idx)[i].defaultValue = "";
	}
	$('textarea').text('');
}

$(document).ready(function() {
	/*
	Image reference
	bg_signup.jpg: https://static1.squarespace.com/static/574ff940b09f95f3b309b82b/5754fbd1e651595e56dc6caf/5897f18020099e1b6fc290d7/1488352552216/correr-running.jpg
	
	bg_home.jpg: http://i.huffpost.com/gen/1591568/images/o-RUNNING-facebook.jpg
	*/
	// Initialize page based elements/parameters
	var bg_signup = "./images/bg_signup.jpg";
	var bg_home = "./images/bg_home.jpg";
	if ($('#signup_form').length == 1) {
		$('body').css('background-image', 'url(' + bg_signup + ')');
		$('#sign_up').css('border-bottom-color','#c53c3a');
		$('#char_count').text((100 - $('[name="medcond"]').val().length) + ' character(s) left');
		$('[name="pic"]').focus();
		enableSubmit();
	}
	else if($('#login_form').length == 1) {
		$('body').css('background-image', 'url(' + bg_signup + ')');
		$('#report').css('border-bottom-color','#c53c3a');
		$('#password').focus();
		enableSubmit();
		$(':submit').prop('title', 'Enter Password to continue.');
	}
	else {
		$('body').css('background-image', 'url(' + bg_home + ')');
		$('#home').css('border-bottom-color','#c53c3a');
	}
	
	// handler for "Upload Your Picture"
	$('input[name="pic"]').on('blur change', function(){
		if (this.files[0] == null) {
			$('#pic_error').text("Please upload your picture.");
			$('#pic_error').addClass('error_background');
			disableSubmit();
		}
		else if (!isValidFileFormat(this.files[0].name)) {
			$('#pic_error').text("Only .jpg, .jpeg, .png, .bmp, .svg, .gif, .tiff image formats are allowed. Upload another image.");
			$('#pic_error').addClass('error_background');
			disableSubmit();
		}
		else if (this.files[0].size/1000 > 1000) {
			$('#pic_error').text("File size exceeds 1 MB. Upload a smaller image.");
			$('#pic_error').addClass('error_background');
			disableSubmit();
		}
		else {
			$('#pic_error').text("");
			$('#pic_error').removeClass('error_background');
			enableSubmit();
		}
	});
	
	// handler for "First Name"
	$('[name="firstname"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string check
			$('#firstname_error').text("First Name cannot be empty.");
			$('#firstname_error').addClass('error_background');
			disableSubmit();
		}
		else {
			$('#firstname_error').text("");
			$('#firstname_error').removeClass('error_background');
			enableSubmit();
		}
	});
	
	// handler for "Middle Name"
	$('[name="middlename"]').on('blur', function(){
		var value = $(this).val();
		
		if(isEmpty(value)) {
			$(this).val("");
		}
	});
	
	// handler for "Last Name"
	$('[name="lastname"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string check
			$('#lastname_error').text("Last Name cannot be empty.");
			$('#lastname_error').addClass('error_background');
			disableSubmit();
		}
		else {
			$('#lastname_error').text("");
			$('#lastname_error').removeClass('error_background');
			enableSubmit();
		}
	});
	
	// handler for "Address Line 1"
	$('[name="addrline1"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string check
			$('#addrline1_error').text("Address Line 1 cannot be empty.");
			$('#addrline1_error').addClass('error_background');
			disableSubmit();
		}
		else {
			$('#addrline1_error').text("");
			$('#addrline1_error').removeClass('error_background');
			enableSubmit();
		}
	});
	
	// handler for "Address Line 2"
	$('[name="addrline2"]').on('blur', function(){
		var value = $(this).val();
		
		if(isEmpty(value)) {
			$(this).val("");
		}
	});
	
	// handler for "city"
	$('[name="city"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string check
			$('#city_error').text("City cannot be empty.");
			$('#city_error').addClass('error_background');
			disableSubmit();
		}
		else {
			$('#city_error').text("");
			$('#city_error').removeClass('error_background');
			enableSubmit();
		}
	});
	
	// handlers for "State"
	$('[name="state"]').on('keyup', function(){
		$(this).val($(this).val().toUpperCase());
	});
	
	$('[name="state"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string and invalid characters check
			$('#state_error').text("State cannot be empty.");
			$('#state_error').addClass('error_background');
			disableSubmit();
		}
		else if(!isValidState(value)) {
			$('#state_error').text("Enter valid State (2-letters eg. CA).");
			$('#state_error').addClass('error_background');
			disableSubmit();
		}
		else {
			$('#state_error').text("");
			$('#state_error').removeClass('error_background');
			enableSubmit();
		}
	});
	
	// handler for "Zip Code"
	$('[name="zip"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string and invalid characters check
			$('#zip_error').text("Zip Code cannot be empty.");
			$('#zip_error').addClass('error_background');
			disableSubmit();
		}
		else if(!isValidZip(value)) {
			$('#zip_error').text("Enter a valid 5-digit zip code.");
			$('#zip_error').addClass('error_background');
			disableSubmit();
		}
		else {
			$('#zip_error').text("");
			$('#zip_error').removeClass('error_background');
			enableSubmit();
		}
	});
	
	// handler for "Primary Phone"
	$('[name="phone"]').on('blur change', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string and invalid characters check
			$('#phone_error').text("Phone number cannot be empty.");
			$('#phone_error').addClass('error_background');
			disableSubmit();
		}
		else if(!isValidPhone(value)) {
			$('#phone_error').text("Enter a valid 10-digit phone number.");
			$('#phone_error').addClass('error_background');
			disableSubmit();
		}
		else {
			$('#phone_error').text("");
			if (value.split("-").length == 1) {
				var val = value.substr(0, 3) + '-' + value.substr(3, 3) + '-' + value.substr(6, 4);
				$(this).val(val);
			}
			$('#phone_error').removeClass('error_background');
			enableSubmit();
			var param = "phone=" + $(this).val();
			var url = "check_dup.php?" + param;
			$.get(url, dup_handler);
		}
	});
	
	// handler for duplicate phone no.
	function dup_handler(response) {
		if(response == "dup") {
			$('#phone_error').text("Phone no. already registered. Please enter another no.");
			$('#phone_error').addClass('error_background');
			disableSubmit();
		}
		else if(response == "OK") {
			var value = $('[name="phone"]').val();
			$('#phone_error').text("");
			if (value.split("-").length == 1) {
				var val = value.substr(0, 3) + '-' + value.substr(3, 3) + '-' + value.substr(6, 4);
				$(this).val(val);
			}
			$('#phone_error').removeClass('error_background');
			enableSubmit();
		}
	}
	
	// handler for "Email Id"
	$('[name="emailid"]').on('blur change', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string and invalid characters check
			$('#emailid_error').text("Email Id cannot be empty.");
			$('#emailid_error').addClass('error_background');
			disableSubmit();
		}
		else if(!isValidEmail(value)) {
			$('#emailid_error').text("Enter a valid email id.");
			$('#emailid_error').addClass('error_background');
			disableSubmit();
		}
		else {
			$('#emailid_error').text("");
			$('#emailid_error').removeClass('error_background');
			enableSubmit();
		}
		
	});
	
	// handler for "Gender"
	$('[name="gender"]').on('click blur', function(){
		if (!isChecked($('[name="gender"]'))) {
			$('#gender_error').text("Please select one option.");
			$('#gender_error').addClass('error_background');
			disableSubmit();
		}
		else {
			$('#gender_error').text("");
			$('#gender_error').removeClass('error_background');
			enableSubmit();
		}
	});
	
	// handler for "Date of Birth"
	$('[name="dob"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {
			$('#dob_error').text("Date of Birth cannot be empty.");
			$('#dob_error').addClass('error_background');
			disableSubmit();
		}
		else if (value.split("/").length == 1) {
			$('#dob_error').text("Enter date in mm/dd/yyyy format.");
			$('#dob_error').addClass('error_background');
			disableSubmit();
		}
		else if (!isValidDate(value)) {
			$('#dob_error').text("Enter a valid date! Enter date in mm/dd/yyyy format.");
			$('#dob_error').addClass('error_background');
			disableSubmit();
		}
		else if (getAge(value) < 13 || getAge(value) > 90) {
			$('#dob_error').text("You should be between 13 and 90 to participate.");
			$('#dob_error').addClass('error_background');
			disableSubmit();
		}
		else {
			$('#dob_error').text("");
			$('#dob_error').removeClass('error_background');
			enableSubmit();
		}
	});
	
	// handler for "Medical Conditions"
	$('[name="medcond"]').on('keyup', function(){
		if($(this).val().length < 100) {
			var charCount = 100 - $(this).val().length;
			$('#char_count').text(charCount + ' character(s) left');
		}
		else {
			$(this).val($(this).val().substr(0,100));
			$('#char_count').text('0 character(s) left');
		}
	});
	
	// handler for "Experience Level"
	$('[name="explvl"]').on('click blur', function(){
		if (!isChecked($('[name="explvl"]'))) {
			$('#explvl_error').text("Please select one option.");
			$('#explvl_error').addClass('error_background');
			disableSubmit();
		}
		else {
			$('#explvl_error').text("");
			$('#explvl_error').removeClass('error_background');
			enableSubmit();
		}
	});
	
	// handler for "Category"
	$('[name="category"]').on('click blur', function(){
		if (!isChecked($('[name="category"]'))) {
			$('#category_error').text("Please select one option.");
			$('#category_error').addClass('error_background');
			disableSubmit();
		}
		else {
			$('#category_error').text("");
			$('#category_error').removeClass('error_background');
			enableSubmit();
		}
	});
	
	// handler for "Clear Form"
	$(':reset').on('click', function(){
		clearErrors();
		clearData();
		disableSubmit();
		$('[name="pic"]').focus();
		$(window).scrollTop(0);
	});
	
	// handler for Password
	$('#password').on('keyup blur', function() {
		if(!isEmpty($(this).val())) {
			$('#get_report').prop('disabled', '');
			$('#get_report').removeClass('disabled');
			
		}
		else {
			$('#get_report').prop('disabled', 'disabled');
			$('#get_report').addClass('disabled');
		}
		$('#password_error').text('');
		$('#password_error').removeClass('error_background');
	});
	
});