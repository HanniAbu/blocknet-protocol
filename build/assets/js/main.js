$(document).ready(function() {
	$('ul.tabs').tabs();
	$('.button-collapse').sideNav();
	$('select').material_select();
	$('.collapsible').collapsible();
	$('.tooltipped').tooltip({delay: 10});
	$('.modal').modal();
	$('.button-collapse').sideNav({draggable: false});
	// $('.modal-trigger').leanModal({
	// 	dismissible: false
	// });
	
	insertSocial();

	// Mailchimp
	window.fnames = new Array(); 
	window.ftypes = new Array();
	fnames[0]='EMAIL';
	ftypes[0]='email';
	fnames[1]='FNAME';
	ftypes[1]='text';
	fnames[2]='LNAME';
	ftypes[2]='text';
	// var $mcj = jQuery.noConflict(true);
});


$(".tab").click(function(){
	$('html, body').animate({ scrollTop: 0 }, 'fast');
});

// Puts values & decimals in better format
function numberPretty(num) {
	var number = num.toString();
	var decimal = 0;
	if (number.indexOf(".") != -1) {
		number = number.split('.');
		decimal = 1;
	} else {
		number = number.split('');
	}
	var prettyNum;
	if (number[0] > 0) {
    if (decimal) {
			number[0] = number[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			number[1] = number[1].substr(0,2);
    	prettyNum = number.join(".");
    } else {
    	number = number.join("");
    	prettyNum = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
	} else {
		prettyNum = Math.round(num*1000000)/1000000;
	}
	return prettyNum;
};

function insertSocial() {

};


