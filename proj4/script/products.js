/*
	Revankar, Akash
	jadrn054
	Project #4
	Fall 2017

	products.js

	handles products page population and other behaviors of products page.
*/   


var proj4_data;
var productCategoryHandles = [];
   
// from http://www.webmasterworld.com/forum91/3262.htm            
function explodeArray(item,delimiter) {
	tempArray = new Array();
	var count = 0;
	var tempString = new String(item);

	while (tempString.indexOf(delimiter) > 0) {
		tempArray[count] = tempString.substr(0,tempString.indexOf(delimiter));
		tempString = tempString.substr(tempString.indexOf(delimiter) + 1, tempString.length-tempString.indexOf(delimiter) + 1);
		count = count + 1;
	}
	tempArray[count] = tempString;
	
	return tempArray;
}


// populate Home page products
function loadHomePageProducts() {
	var n = 3;
	var product = '';
	var k = Math.floor(Math.random() * (proj4_data.length - 1));
	random_product = [proj4_data[k], proj4_data[(k+7)%37], proj4_data[(k+13)%37]];
	
	for(var i=0; i<n; i++) {
		product += '<div class="home-product"><img src="/~jadrn000/PROJ4_IMAGES/' + random_product[i][0] + '.jpg" alt="'+ random_product[i][2] +'" width="200px" height="auto" />';
		product += '<h3>'+ random_product[i][2] +'</h3>';
		product += '<p>'+ random_product[i][3] +'</p>';
		product += '<p>Price: $'+ random_product[i][6] +'</p>';
		product += '<button id="add-to-cart" name="sku" value="'+ random_product[i][0] +'">Add to Cart</button>';
		product += '</div>';
	}
	
    var handle = document.getElementsByClassName('home-products-container')[0];
    handle.innerHTML = product;
}

// populate Products page
function loadProducts(response) {
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj4_data[i] = innerArray;
    }
	
	loadHomePageProducts();
	setInterval(loadHomePageProducts, 20000);
	
	var categories = [
		{"title":"Milk Chocolate", "key":"Milk chocolate", "id":"category-milk-chocolate"},
		{"title":"Dark Chocolate", "key":"Dark chocolate", "id":"category-dark-chocolate"},
		{"title":"Nuts & Chews", "key":"Nuts and chews", "id":"category-nuts-chews"},
		{"title":"Brittles & Toffies", "key":"Brittles and toffies", "id":"category-brittles-toffies"},
		{"title":"Truffles", "key":"Truffles", "id":"category-truffles"},
		{"title":"Gifts", "key":"Gifts", "id":"category-gifts"},
		{"title":"Holiday Assortments", "key":"Holiday assortments", "id":"category-holiday-assortments"}];
	
	for(var j=0; j<categories.length; j++) {
		var products = '<div class="title centered"><h2>'+ categories[j].title +'</h2></div><div class="product-list">';
	    for(var i=0; i < proj4_data.length; i++) {
	        if(proj4_data[i][1] == categories[j].key) {
				products += '<div class="product"><img src="/~jadrn000/PROJ4_IMAGES/' + proj4_data[i][0] + '.jpg" alt="'+ proj4_data[i][2] +'" width="200px" height="auto" />';
				products += '<h3>'+ proj4_data[i][2] +'</h3>';
				products += '<p>'+ proj4_data[i][3] +'</p>';
				products += '<p>'+ proj4_data[i][4] +'</p>';
				products += '<p>Price: $'+ proj4_data[i][6] +'</p>';
				products += '<button id="add-to-cart" name="sku" value="'+ proj4_data[i][0] +'">Add to Cart</button>';
				products += '</div>';
	        }
	    }
		products += '</div>';
	    var handle = document.getElementById(categories[j].id);
	    handle.innerHTML = products;
	}
	
	window.updateCart();
}

function showAllProducts() {
	for(var i=0; i<productCategoryHandles.length; i++)
		productCategoryHandles[i].show();
}

function hideOtherProducts(j) {
	for(var i=0; i<productCategoryHandles.length; i++)
		if(i != j)
			productCategoryHandles[i].hide();
}

$(document).ready(function() {
	
	//from https://css-tricks.com/snippets/jquery/smooth-scrolling/
	$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
		if(location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
		    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				event.preventDefault();
				$('html, body').animate({scrollTop: target.offset().top}, 300);
				return false;
			}
		}
	});
	
	proj4_data = new Array();
	$.get('/perl/jadrn054/get_products.cgi', loadProducts);
	
	productCategoryHandles = [$('#category-milk-chocolate'), $('#category-dark-chocolate'), $('#category-nuts-chews'),
	$('#category-brittles-toffies'), $('#category-truffles'), $('#category-gifts'), $('#category-holiday-assortments')];
		
	$('#all').on('click load', function() {
		if($('#all').is(':checked')) {
			showAllProducts();
		}
	});
	
	$('#milk-chocolate').on('click', function() {
		$('#category-milk-chocolate').show();
		hideOtherProducts(0);
	});
	$('#dark-chocolate').on('click', function() {
		$('#category-dark-chocolate').show();
		hideOtherProducts(1);
	});
	$('#nuts-chews').on('click', function() {
		$('#category-nuts-chews').show();
		hideOtherProducts(2);
	});
	$('#brittles-toffies').on('click', function() {
		$('#category-brittles-toffies').show();
		hideOtherProducts(3);
	});
	$('#truffles').on('click', function() {
		$('#category-truffles').show();
		hideOtherProducts(4);
	});
	$('#gifts').on('click', function() {
		$('#category-gifts').show();
		hideOtherProducts(5);
	});
	$('#holiday-assortments').on('click', function() {
		$('#category-holiday-assortments').show();
		hideOtherProducts(6);
	});
});