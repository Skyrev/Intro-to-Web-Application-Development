/*
	Revankar, Akash
	jadrn054
	Project #4
	Fall 2017

	order.js
	
	handles orders page behavior
*/

var cart = new shopping_cart("jadrn054");
var orderPlaced = false;
var cardNumber;

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
	var regex = /^[0-9]{10}$/;
	return regex.test($.trim(value));
}

function isValidCard(value) { 
	var regex = /^[0-9]{16}$/;
	return regex.test($.trim(value));
}

function isValidExpirationDate(value) {
	var date = value.split('/'); 
    var month = date[0];
    var year = date[1];
    
    // now turn the three values into a Date object and check them
    var today = new Date();    
    var thisMonth = today.getMonth()+1;
    var thisYear = today.getFullYear();
    
    if((year > thisYear && month < 13) || (year == thisYear && month >= thisMonth) )
        return true;
    else
        return false;
}

function disableSubmit() {
	$('#pay-now').prop('disabled', 'disabled');
	$('#pay-now').prop('title', 'Fill all mandatory fields to place order');
	$('#pay-now').addClass('disabled');
}

// enable Submit button if there are no errors
function enableSubmit() {
	var idx = $('.errors span');
	var idy = $('#place-order-form input');
	
	for(i=0; i<idx.length; i++) {
		if ($(idx[i]).text().length != 0) {
			disableSubmit();
			return;
		}
	}
	for(i=0; i<idy.length; i++) {
		if (i != 3 && i != 11 && $(idy[i]).val().length == 0) {
			disableSubmit();
			return;
		}
	}
	
	if ($('#payment-type option:selected').val() == 'Unselected') {
		disableSubmit();
		return;
	}
	
	$('#pay-now').prop("disabled", "");
	$('#pay-now').prop('title', '');
	$('#pay-now').removeClass('disabled');
}

// clear all error messages
function clearErrors() {
	var idx = $('.errors span');
	for(i=0; i<idx.length; i++) {
		$(idx[i]).text("");
		$(idx[i]).removeClass('error-background');
	}
	if($('div.error-background').length != 0)
		$('div.error-background').remove();
}

function clearData() {
	var idx = $('input');
	for(i=0; i<idx.length; i++) {
		$(idx)[i].defaultValue = "";
	}
	$('#payment-type option:eq(0)').prop('selected', true);
}

function isCartEmpty() {
	return cart.size() == 0;
}

function clearCart() {
	var cartArray = cart.getCartArray();
	for(var i=0; i<cartArray.length; i++)
		cart.delete(cartArray[i][0]);
	orderPlaced = false;
}

function updateCart() {
	if(!isCartEmpty()) {
		var cartArray = cart.getCartArray();
		var cartSize = cart.size();
		var grossTotal = 0;
		var htmlCode = '';
		
		if(orderPlaced) {
			htmlCode += '<div class="order-confirmation centered align-center"><p>Order successfully placed with card bearing number xxxx-xxxx-xxxx-'+ cardNumber.slice(12) +'.<br/>';
			htmlCode += 'It&apos;ll be shipped to<br/>'+ $('[name="firstname-shipping"]').val() + ' ' + $('[name="lastname-shipping"]').val() + '<br/>';
			htmlCode += $('[name="addrline1-shipping"]').val() + '<br/>' + $('[name="addrline2-shipping"]').val() + '<br/>';
			htmlCode += $('[name="city-shipping"]').val() + ', ' + $('[name="state-shipping"]').val() + ', ' + $('[name="zip-shipping"]').val() + '</p>';
			htmlCode += '<a href="#products" id="continue-shopping" class="centered">Continue Shopping</a></div>';
		}
		
		if(!orderPlaced)
			htmlCode += '<p class="align-center">Item(s) in Cart: ' + cartSize + '</p>';
		
		htmlCode += '<div class="tables centered"><table class="cart-items-table">';
		for(var i=0; i<cartArray.length; i++) {
			var sku = cartArray[i][0];
			var qty = cartArray[i][1];
			var title = '';
			var price = 0;
			var total = 0;
			for(var j=0; j<window.proj4_data.length; j++) {
				if(sku == window.proj4_data[j][0]) {
					title = window.proj4_data[j][2];
					price = eval(window.proj4_data[j][6]);
					break;
				}
			}
			total = eval(qty*price);
			htmlCode += '<tr><td class="cit-col1"><img src="/~jadrn000/PROJ4_IMAGES/'+ sku +'.jpg" alt="'+ sku +'" width="100px" height="auto" /></td>';
			htmlCode += '<td class="cit-col2">' + title + '<br/>';
			
			if(orderPlaced)
				htmlCode += 'Quantity: <input id="sku_' + sku + '" type="text" name="quantity" value="' + qty + '" size="4" pattern="\d+" disabled /><br/>';
			else
				htmlCode += 'Quantity: <input id="sku_' + sku + '" type="text" name="quantity" value="' + qty + '" size="4" pattern="\d+" /><br/>';
			
			htmlCode += 'Price: $'+ price.toFixed(2) +'<br/>';
			htmlCode += 'Total: $' + total.toFixed(2);
			
			if(!orderPlaced)
				htmlCode += '<button class="remove-button" name="remove" value="'+ sku +'">Remove</button></td>';
		
			grossTotal += total;
		}
		htmlCode += '</table>';
		
		htmlCode += '<table class="billing-table"><tr><td class="bt-col1 align-right">Items Total:<br/>Tax (@ 8%):<br/>Shipping Charges:<br/>Net Amount Payable:</td>';
		htmlCode += '<td class="bt-col2 align-right">$' + eval(grossTotal).toFixed(2) + '<br/>$' + eval(0.08*grossTotal).toFixed(2) + '<br/>$2.00<br/>$'
					+ eval(1.08*grossTotal + 2).toFixed(2) + '</td></tr></table></div>';
		
		if(!orderPlaced) {
			htmlCode += '<div class="cart-empty-order-buttons centered"><button class="empty-cart-button" name="empty-cart" value="">Empty Cart</button>';
			htmlCode += '<button class="place-order-button" name="place-order" value="">Place Order</button></div>';
		}
		
		$('.cart').html(htmlCode);
		
		$('.empty-cart-msg').hide();
		$('.cart').show();
		$('#cart-item-count').text(cartSize);
		$('#cart-item-count').css('background-color', '#ff3333');
		$('#cart-nav').attr('title', cartSize + ' item(s) in cart');
	}
	else {
		$('.empty-cart-msg').show();
		$('.cart').hide();
		$('#cart-item-count').text('');
		$('#cart-item-count').css('background-color', 'transparent');
		$('#cart-nav').attr('title', 'Your cart is empty!');
	}
}

function displayConfirmation(response) {
	orderPlaced = true;
	updateCart();
	$('.place-order-form-modal').css('display', 'none');
	$('#order-nav').click();
	$('#cart-item-count').text('');
	$('#cart-item-count').css('background-color', 'transparent');
	clearCart();
}

$(document).ready(function() {	
	$(document).on('click', '#add-to-cart', function() {
		cart.add(this.value, 1);
		updateCart();
	});
	
	$(document).on('click', '[name="remove"]', function() {
		cart.delete(this.value);
		updateCart();
	});
	
	$(document).on('blur', '[name="quantity"]', function() {
		if(this.value == 0)
			cart.delete(this.id.slice(4))
		else
			cart.setQuantity(this.id.slice(4), this.value);
		
		updateCart();
	});
	
	$(document).on('click', '.place-order-button', function() {
		$('.place-order-form-modal').css('display', 'block');
		enableSubmit();
	});
	
	$(document).on('click', '.empty-cart-button', function() {
		clearCart();
		updateCart();
		$('#order-nav').click();
	});
	
	$('#close-modal, #cancel').on('click', function(e) {
		$('.place-order-form-modal').css('display', 'none');
		e.preventDefault();
	});
	
	$('#pay-now').on('click', function(e) {
		e.preventDefault();
		cardNumber = $('#card-number').val();
		$.get('/perl/jadrn054/place_order.cgi', displayConfirmation);
	});
	
	// handler for "Clear Form"
	$(':reset').on('click', function(){
		clearErrors();
		clearData();
		disableSubmit();
	});
	
	$(document).on('click', '#continue-shopping', function() {
		clearCart();
		updateCart();
	});
	
	// handler for "First Name"
	$('[name="firstname-billing"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string check
			$('#firstname-billing-error').text("First Name cannot be empty.");
			$('#firstname-billing-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#firstname-billing-error').text("");
			$('#firstname-billing-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "Last Name"
	$('[name="lastname-billing"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string check
			$('#lastname-billing-error').text("Last Name cannot be empty.");
			$('#lastname-billing-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#lastname-billing-error').text("");
			$('#lastname-billing-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "Address Line 1"
	$('[name="addrline1-billing"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string check
			$('#addrline1-billing-error').text("Address Line 1 cannot be empty.");
			$('#addrline1-billing-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#addrline1-billing-error').text("");
			$('#addrline1-billing-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "Address Line 2"
	$('[name="addrline2-billing"]').on('blur', function(){
		var value = $(this).val();
		
		if(isEmpty(value)) {
			$(this).val("");
		}
	});
	
	// handler for "city"
	$('[name="city-billing"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string check
			$('#city-billing-error').text("City cannot be empty.");
			$('#city-billing-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#city-billing-error').text("");
			$('#city-billing-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handlers for "State"
	$('[name="state-billing"]').on('keyup', function(){
		$(this).val($(this).val().toUpperCase());
	});
	
	$('[name="state-billing"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string and invalid characters check
			$('#state-billing-error').text("State cannot be empty.");
			$('#state-billing-error').addClass('error-background');
			disableSubmit();
		}
		else if(!isValidState(value)) {
			$('#state-billing-error').text("Enter valid State (2-letters eg. CA).");
			$('#state-billing-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#state-billing-error').text("");
			$('#state-billing-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "Zip Code"
	$('[name="zip-billing"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string and invalid characters check
			$('#zip-billing-error').text("Zip Code cannot be empty.");
			$('#zip-billing-error').addClass('error-background');
			disableSubmit();
		}
		else if(!isValidZip(value)) {
			$('#zip-billing-error').text("Enter a valid 5-digit zip code.");
			$('#zip-billing-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#zip-billing-error').text("");
			$('#zip-billing-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "Phone"
	$('[name="phone-billing"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string and invalid characters check
			$('#phone-billing-error').text("Phone number cannot be empty.");
			$('#phone-billing-error').addClass('error-background');
			disableSubmit();
		}
		else if(!isValidPhone(value)) {
			$('#phone-billing-error').text("Enter a valid 10-digit phone number.");
			$('#phone-billing-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#phone-billing-error').text("");
			$('#phone-billing-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "First Name"
	$('[name="firstname-shipping"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string check
			$('#firstname-shipping-error').text("First Name cannot be empty.");
			$('#firstname-shipping-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#firstname-shipping-error').text("");
			$('#firstname-shipping-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "Last Name"
	$('[name="lastname-shipping"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string check
			$('#lastname-shipping-error').text("Last Name cannot be empty.");
			$('#lastname-shipping-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#lastname-shipping-error').text("");
			$('#lastname-shipping-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "Address Line 1"
	$('[name="addrline1-shipping"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string check
			$('#addrline1-shipping-error').text("Address Line 1 cannot be empty.");
			$('#addrline1-shipping-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#addrline1-shipping-error').text("");
			$('#addrline1-shipping-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "Address Line 2"
	$('[name="addrline2-shipping"]').on('blur', function(){
		var value = $(this).val();
		
		if(isEmpty(value)) {
			$(this).val("");
		}
	});
	
	// handler for "city"
	$('[name="city-shipping"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string check
			$('#city-shipping-error').text("City cannot be empty.");
			$('#city-shipping-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#city-shipping-error').text("");
			$('#city-shipping-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handlers for "State"
	$('[name="state-shipping"]').on('keyup', function(){
		$(this).val($(this).val().toUpperCase());
	});
	
	$('[name="state-shipping"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string and invalid characters check
			$('#state-shipping-error').text("State cannot be empty.");
			$('#state-shipping-error').addClass('error-background');
			disableSubmit();
		}
		else if(!isValidState(value)) {
			$('#state-shipping-error').text("Enter valid State (2-letters eg. CA).");
			$('#state-shipping-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#state-shipping-error').text("");
			$('#state-shipping-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "Zip Code"
	$('[name="zip-shipping"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string and invalid characters check
			$('#zip-shipping-error').text("Zip Code cannot be empty.");
			$('#zip-shipping-error').addClass('error-background');
			disableSubmit();
		}
		else if(!isValidZip(value)) {
			$('#zip-shipping-error').text("Enter a valid 5-digit zip code.");
			$('#zip-shipping-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#zip-shipping-error').text("");
			$('#zip-shipping-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "Phone"
	$('[name="phone-shipping"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string and invalid characters check
			$('#phone-shipping-error').text("Phone number cannot be empty.");
			$('#phone-shipping-error').addClass('error-background');
			disableSubmit();
		}
		else if(!isValidPhone(value)) {
			$('#phone-shipping-error').text("Enter a valid 10-digit phone number.");
			$('#phone-shipping-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#phone-shipping-error').text("");
			$('#phone-shipping-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "Shipping address same as billing address"
	$('[name="same-addr"]').on('change', function() {
		if(this.checked) {
			$('[name="firstname-shipping"]').val($('[name="firstname-billing"]').val());
			$('[name="lastname-shipping"]').val($('[name="lastname-billing"]').val());
			$('[name="addrline1-shipping"]').val($('[name="addrline1-billing"]').val());
			$('[name="addrline2-shipping"]').val($('[name="addrline2-billing"]').val());
			$('[name="city-shipping"]').val($('[name="city-billing"]').val());
			$('[name="state-shipping"]').val($('[name="state-billing"]').val());
			$('[name="zip-shipping"]').val($('[name="zip-billing"]').val());
			$('[name="phone-shipping"]').val($('[name="phone-billing"]').val());
			enableSubmit();
		}
		else {
			$('[name="firstname-shipping"]').val('');
			$('[name="lastname-shipping"]').val('');
			$('[name="addrline1-shipping"]').val('');
			$('[name="addrline2-shipping"]').val('');
			$('[name="city-shipping"]').val('');
			$('[name="state-shipping"]').val('');
			$('[name="zip-shipping"]').val('');
			$('[name="phone-shipping"]').val('');
			disableSubmit();
		}
	});
	
	// handler for "Payment Type"
	$('#payment-type').on('change blur', function() {
		if($('#payment-type option:selected').val() == 'Unselected') {
			$('#payment-type-error').text("Select a valid payment type.");
			$('#payment-type-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#payment-type-error').text("");
			$('#payment-type-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "Card Number"
	$('[name="card-number"]').on('blur', function(){
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string and invalid characters check
			$('#card-number-error').text("Card number cannot be empty.");
			$('#card-number-error').addClass('error-background');
			disableSubmit();
		}
		else if(!isValidCard(value)) {
			$('#card-number-error').text("Enter a valid 16-digit card number.");
			$('#card-number-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#card-number-error').text("");
			$('#card-number-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
	// handler for "Expiration Date"
	$('[name="expr-date"]').on('blur', function() {
		var value = $(this).val();
		
		if (isEmpty(value)) {	// Empty string and invalid characters check
			$('#expr-date-error').text("Expiration date cannot be empty.");
			$('#expr-date-error').addClass('error-background');
			disableSubmit();
		}
		else if(!isValidExpirationDate(value)) {
			$('#expr-date-error').text("Enter a valid expiration date.");
			$('#expr-date-error').addClass('error-background');
			disableSubmit();
		}
		else {
			$('#expr-date-error').text("");
			$('#expr-date-error').removeClass('error-background');
			enableSubmit();
		}
	});
	
});