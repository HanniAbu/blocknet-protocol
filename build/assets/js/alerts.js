var form = $("#alert-form");
var formInput = $("#alert-form :input");
var submitButton = document.getElementById("alert-submit");


$(submitButton).click(function(e){
	e.preventDefault();
	if (errCheck()) {
		createAlert();
	};
});

// Runs before page renders
$(document).ready(function() {
	if (urlParams.get('id')) {
		$('ul.tabs').tabs('select_tab', 'my-alerts');
		showDeleteModal();
	}
	loadFormPresets();
	updateCurrentValue();
	loadUserAlerts();
	updateSummary();
});

// Runs on form change
formInput.on('change input', function() {
	updateCurrentValue();
	$('#provider-modal').modal('close');
});



function createAlert() {
	// log("Form Submission Initiated", "start");
	// log("\t- Form Data: \n" + form, "wait");
	var data = toJSON();
	var alertValid = data[0];
	var alertData = data[1];
	var url = "https://api.cryptocallback.com/createalert";
	if (alertValid) {
		send(url, alertData, "post");
			// log("Form Successfully Sent", "success");
	}
};


function toJSON() {
	// log("\t- Converting Form Data To Object", "wait");
	var obj = {};
	var data = document.getElementById("alert-form");
	var elements = data.querySelectorAll( "input, select, textarea" );
		// log("\t- Object:\n", "wait");
	var type;
	var provider;
	var valid = true;
	for ( var i = 0; i < elements.length; ++i ) {
		var element = elements[i];
		var key = element.name.toLowerCase();
		var value = element.value;
		if (valid) {
			valid = false;
			if( key ) {
				// log("\t\t- " + key + ": " + value, "wait");
				// Check Notification Type
				if (key === "notification_type") {
					value = value.toLowerCase();
					type = value; 
					if ( isNotificationType(value) ) { valid = true }
				// Get service provider
				} else if (key === "service_provider") {
					provider = value;
					valid = true;
				// Check Contact Email/Number
				} else if (key === "contact") {
					value = value.toLowerCase();
					if (type === "email") {
						if ( isEmail(value) ) { 
							key = "email";
							valid = true;
						};
					} else if (type === "text message") {
						value = value.replace(/[^\w]/gi, '');
						if ( isPhone(value) ) {
							key = "phone";
							value = value + "@" + provider;
							valid = true; 
						};
					} else if (type === "push notification") {
						//Get webpush ID here, else provide message they need to accept it
						value = "webpushID"; 
						key = "webpush";
						valid = true;
					};
				// Check Asset Entry
				} else if (key === "asset") {
					if ( isAsset(value) ) {
						valid = true;
					};
				// Check Metric Type
				} else if (key === "metric") {
					value = value.toLowerCase();
					if ( isMetric(value) ) { valid = true; };
				// Check Direction Value
				} else if (key === "direction") {
					value = value.toLowerCase();
					if ( isDirection(value) ) { valid = true; };
				// Check Curreny Type
				} else if (key === "currency") {
					value = value.toLowerCase().replace(/[^A-Z]/gi, '');
					if ( isCurrency(value) ) { valid = true; };
				// Check Amount Entered
				} else if (key === "amount") {
					value = value.toLowerCase();
					value = Number( value.replace(/[^0-9\.]+/g,""));
					if ( isNumber(value) ) {
						value = value.toString();
						valid = true; };
				// Form Key Doesn't Match
				// } else {
				// 		log("\t\t\t- Form Validation Failed On - " + key + ": " + value, "error");
				// 	valid = false;
				// 	return;
				};
				obj[ key ] = value;
				if ( valid ) { 
					// log("\t\t\t- Validated - " + key + ": " + value, "wait");
				} else if ( !valid ) {
					// log("\t\t\t- Form Validation Failed On - " + key + ": " + value, "error");
					newToast("<em><b>Error!</b> Submission Failed</em>", "fail");
					return;
				}; 
			} else {
				valid = true;
			};
		} else {
			// log("Else...Valid = False", "error");
		};
	};
		// log("\t- Form Data Converted To Object", "wait");
		// log("\t- Form Data Object: \n" + JSON.stringify(obj), "wait");
	return [valid, param( obj )];
}


function param(object) {
    var encodedString = '';
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (encodedString.length > 0) {
                encodedString += '&';
            };
            encodedString += encodeURI(prop + '=' + object[prop]);
        };
    };
    return encodedString;
}

// Sends json through post
function send(path, data, method) {
	// log("- Preparing POST Data To Send", "wait");
	// Set method to post by default, if not specified.
	method = method || "post"; 
	var xhr = new XMLHttpRequest();
	xhr.open(method, path, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		// log("- Sending POST Data", "wait");
	xhr.onload = function() {
		if (xhr.status === 200) {
			newToast("<em><b>Success!</b> Alert Submitted</em>", "success");
			saveAlertPresets();
		}
	};
	xhr.onerror = function() {
		newToast("<em><b>Error!</b> Submission Failed</em>", "fail");
	};
	xhr.send(data);
		// log("- POST Data Complete", "wait");
};





function isNotificationType(type) {
	var re = /^(text message|email|push notification)$/;
	return re.test(type);
};
function isEmail(email) {
	var re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return re.test(email);
};
function isPhone(num) {
	var re = /^[0-9]{10,12}$/;
	return re.test(num);
};
function isAsset(asset) {
	return assetNames.includes(asset)
};
function isMetric(metric) {
	var re = /^(price|volume|market cap)$/;
	return re.test(metric);
};
function isDirection(direction) {
	var re = /^(above|below)$/;
	return re.test(direction);
};
function isCurrency(currency) {
	var currencies = ["aud","brl","cad","chf","cny","eur","gbp","hkd","idr","inr","jpy","krw","mxn","rub","usd"];
	return currencies.includes(currency);
};
function isNumber(num) {
		// console.log("isnumber: " + errMessage);
	return !isNaN(parseFloat(num)) && isFinite(num) && !0;
	// return true;
};




var errMessage = {
	"contact": "",
	"amount": ""
};
function typeCheck() {
	var value = document.getElementById("type").value.toLowerCase();
	var typeProper1 = document.getElementById("typeProper1");
	var typeProper2 = document.getElementById("typeProper2");
	var typeVal = document.getElementById("typeVal");
	var contact = document.getElementById("contact");
	contactCheck();
	typeVal.innerHTML = value;
	if (value == "email") { 
		typeProper1.innerHTML =  "n";
		typeProper2.innerHTML =  "n";
		contact.placeholder = "Email Address";
		contact.setAttribute("data-tooltip", "Enter your email address");
		contact.disabled = false;
		contact.setAttribute("type", "email");
	} else if (value == "text message") { 
		typeProper1.innerHTML =  "&nbsp;&nbsp;(reselect to change  provider)";
		typeProper2.innerHTML =  "";
		contact.placeholder = "Enter Phone Number";
		contact.setAttribute("data-tooltip", "Only enter numbers: XXXXXXXXXX");
		contact.disabled = false;
		contact.setAttribute("type", "tel");
		$('#provider-modal').modal('open');
	} else if (value == "push notification") { 
		typeProper1.innerHTML =  "&nbsp;&nbsp;(reselect to change  provider)";
		typeProper2.innerHTML =  "";
		contact.placeholder = "Contact Not Needed";
		contact.setAttribute("data-tooltip", "Contact is not needed for a push message");
		contact.disabled = true;
	};
	$('.tooltipped').tooltip({delay: 50});
};
function contactCheck() {
	var contact = document.getElementById("contact");
	var value = contact.value.toLowerCase();
	var contactVal = document.getElementById("contactVal");
	var type = document.getElementById("type").value.toLowerCase();
	if (type == "email") {
		if (value == "") {
			contactVal.innerHTML = "(enter email address)";
			errMessage["contact"] = "Please enter an email address\n";
		} else {
			contactVal.innerHTML = value;
			if ( isEmail(value) ) { 
				contact.style.borderColor = "#dbdbdb";
				errMessage["contact"] = "";
			} else {
				contact.style.borderColor = "red";
				errMessage["contact"] = "Please enter a valid email address\n";
			};
		};
	} else {
		if (value == "") {
			contactVal.innerHTML = "(enter phone number)";
			errMessage["contact"] = "Please enter a phone number\n";
		} else {
			value = value.replace(/[^\w\s]/gi, '');
			contactVal.innerHTML = value;
			if ( isPhone(value) ) { 
				contact.style.borderColor = "#dbdbdb";
				errMessage["contact"] = "";
			} else {
				contact.style.borderColor = "red";
				errMessage["contact"] = "Please enter a valid phone number(only numbers)\n";
			};
		};
	};
};
function metricCheck() {
	// var value2 = document.getElementById("metric").value;
	var value = document.getElementById("metric").value.toLowerCase();
	var metricVal = document.getElementById("metricVal");
	// var metricVal2 = document.getElementById("metricVal2");
	metricVal.innerHTML = value;
	// metricVal2.innerHTML = value;
};
function assetCheck() {
	var value = document.getElementById("asset").value;
	var assetVal = document.getElementById("assetVal");
	// var assetVal2 = document.getElementById("assetVal2");
	assetVal.innerHTML = value;
	// assetVal2.innerHTML = value;
};
function directionCheck() {
	var value = document.getElementById("direction").value.toLowerCase();
	var directionVal = document.getElementById("directionVal");
	directionVal.innerHTML = value;
};
function amountCheck() {
	var amount = document.getElementById("amount");
	var value = document.getElementById("amount").value.toLowerCase();
	var amountVal = document.getElementById("amountVal");
	value = Number( value.replace(/[^0-9\.]+/g,""));
	amountVal.innerHTML = value;
	if ( isNumber(value) ) {
		amount.style.borderColor = "#dbdbdb";
		errMessage["amount"] = "";
	} else {
		amount.style.borderColor = "red";
		errMessage["contact"] = "Please enter a valid amount(only numbers and 1 decimal point)\n";
	};
};
function currencyCheck() {
	var value = document.getElementById("currency").value;
	var currencyVal = document.getElementById("currencyVal");
	// var currencyVal2 = document.getElementById("currencyVal2");
	value = value.toLowerCase().charAt(0);
	currencyVal.innerHTML = value;
	// currencyVal2.innerHTML = value;
};
function errCheck() {
	contactCheck();
	amountCheck();
	message = document.getElementById("formErrorMessage");
	message = document.getElementById("formErrorMessage");
	if (errMessage["contact"] == "" && errMessage["amount"] == "") {
		message.innerHTML = "";
		return true;
	} else {
		message.innerHTML = errMessage["contact"] + "<br>" + errMessage["amount"];
		return false;
	};
};



function updateSummary() {
	contactCheck();
	metricCheck();
	assetCheck();
	directionCheck();
	amountCheck();
	currencyCheck();
};
// Updates the current value under the alert form
function updateCurrentValue() {
	var formData = form.serializeArray().reduce(function(obj, item) {
    obj[item.name] = item.value;
    return obj;
	}, {});
	var assetID = assetTuples[formData.asset];
	// var dataVal;
	var request = new XMLHttpRequest();
	var url = 'https://api.coinmarketcap.com/v1/ticker/' + assetID + '/';
	request.open('GET', url , true);
	request.onload = function() {
		var status = request.status;
		var response = JSON.parse(request.responseText);
		var dataVal;
		// currency = formData.currency.toLowerCase().charAt(0);
		currency = "&#36;";
	  if (status >= 200 && status < 400) {
			if (formData.metric == "Price") {
				dataVal = numberPretty(response[0]['price_usd']);
			} else if (formData.metric == "Volume") {
				dataVal = numberPretty(response[0]['24h_volume_usd']);
			} else if (formData.metric == "Market Cap"){
				dataVal = numberPretty(response[0]['market_cap_usd']);
			} else {
				dataVal = "%Error%";
			};
	  } else {
	    newToast("<em><b>Error!</b> Database Unavailable</em>", "fail");
		  dataVal = "Error";
	  };
	  var currentValues = formData.asset + " " + formData.metric + ": " + currency + dataVal;
	  document.getElementById('currentValue').innerHTML = currentValues;

	};
	request.send();
};
// Gets form data and puts into name:value object
function getFormData() {
	form.serializeArray().reduce(function(obj, item) {
    obj[item.name] = item.value;
    return obj;
	}, {});
};


function saveAlertPresets() {
	var type = document.getElementById("type").value;
	var provider = document.getElementById("provider").value;
	var contact = document.getElementById("contact").value;
	var metric = document.getElementById("metric").value;
	var asset = document.getElementById("asset").value;
	var direction = document.getElementById("direction").value;
	var currency = document.getElementById("currency").value;
	var amount = document.getElementById("amount").value;
	var alertPresets = {
		"type": type,
		"provider": provider,
		"contact": contact,
		"metric": metric,
		"asset": asset,
		"direction": direction,
		"currency" : currency,
		"amount": amount
	};
	settings["alertPresets"] = alertPresets;
	localStorage.setItem("settings", JSON.stringify(settings));
	if (!settings["alertAssets"].includes(asset)) {
		settings["alertAssets"].push(asset);
		localStorage.setItem("settings", JSON.stringify(settings));
	};
	if (type.toLowerCase() === "email") {
		if (!settings["emails"].includes(contact)) {
			settings["emails"].push(contact);
			localStorage.setItem("settings", JSON.stringify(settings));
		};
	} else if (type.toLowerCase() === "text message") {
		if (!settings["phoneNumbers"].includes(contact)) {
			settings["phoneNumbers"].push(contact);
			var phoneEmail = contact + "@" + provider;
			if (!settings["emails"].includes(phoneEmail)) {
				settings["emails"].push(phoneEmail);
				localStorage.setItem("settings", JSON.stringify(settings));
			} else {
			localStorage.setItem("settings", JSON.stringify(settings));
			};
		};
	} else if (type.toLowerCase() === "push notification") {
	};
	console.log(settings);
};


function loadFormPresets() {
	document.getElementById("contact").value = settings["alertPresets"]["contact"];
	document.getElementById("amount").value = settings["alertPresets"]["amount"];

	document.getElementById("type").value = settings["alertPresets"]["type"];
	// var type = document.getElementById("type");
	// for (var i = 0; i < type.options.length; i++) {
	// 	if (type.options[i].value == settings["alertPresets"]["type"]) {
	// 		type.options[i].selected = true;
	// 		break;
	// 	};
	// };
	$("#type").material_select();
	
	document.getElementById("provider").value = settings["alertPresets"]["provider"];
	// var provider = document.getElementById("provider");
	// for (var i = 0; i < provider.options.length; i++) {
	// 	if (provider.options[i].value == settings["alertPresets"]["provider"]) {
	// 		provider.options[i].selected = true;
	// 		break;
	// 	};
	// };
	$("#provider").material_select();

	document.getElementById("metric").value = settings["alertPresets"]["metric"];
	// var metric = document.getElementById("metric");
	// for (var i = 0; i < metric.options.length; i++) {
	// 	if (metric.options[i].value == settings["alertPresets"]["metric"]) {
	// 		metric.options[i].selected = true;
	// 		break;
	// 	};
	// };
	$("#metric").material_select();

	document.getElementById("asset").value = settings["alertPresets"]["asset"];
	// var asset = document.getElementById("asset");
	// for (var i = 0; i < asset.options.length; i++) {
	// 	if (asset.options[i].value == settings["alertPresets"]["asset"]) {
	// 		asset.options[i].selected = true;
	// 		break;
	// 	};
	// };
	$("#asset").material_select();

	document.getElementById("direction").value = settings["alertPresets"]["direction"];
	// var direction = document.getElementById("direction");
	// for (var i = 0; i < direction.options.length; i++) {
	// 	if (direction.options[i].value == settings["alertPresets"]["direction"]) {
	// 		direction.options[i].selected = true;
	// 		break;
	// 	};
	// };
	$("#direction").material_select();

	document.getElementById("currency").value = settings["alertPresets"]["currency"];
	// var currency = document.getElementById("currency");
	// for (var i = 0; i < currency.options.length; i++) {
	// 	if (currency.options[i].value == settings["alertPresets"]["currency"]) {
	// 		currency.options[i].selected = true;
	// 		break;
	// 	};
	// };
	$("#currency").material_select();

};


function loadUserAlerts() {
	var userEmail = settings["emails"][0];
	$.ajax({
		type: "GET",
		url: "https://api.cryptocallback.com/useralerts/" + userEmail,
		dataType: 'JSON',
		error: function(){
			newToast("<em><b>Error!</b> Database Unavailable, Try Refreshing</em>", "fail");
		},
		success: function(data){
			if (data.length) {
				var html = "<table id='alert-table' class='highlight display'><thead><tr><th>Asset</th><th>Metric</th><th>Direction</th><th>Amount</th><th>Email</th></tr></thead><tbody>";
				// var html = "";

				for (var alert = 0; alert < data.length; alert++) {
					html += "<tr><td>" + data[alert]["asset"] + "</td><td>" + data[alert]["metric"] + "</td><td>" + data[alert]["direction"] + "</td><td>" + data[alert]["amount"] + "</td><td>" + data[alert]["email"] + "</td></tr>";
				}

				html += "</tbody></table";
				document.getElementById("alert-list").innerHTML = html;
				$('table').DataTable({
					"paging": false,
					"language": {
						search: "_INPUT_",
		        searchPlaceholder: "search alerts"
			    }
				});

				
				document.getElementById("alert-table_filter").className += " input-field";
				// $('#alert-table_filter').addClass("input-field");
				// $('#alert-table_filter label').prepend("<i class='material-icons prefix turq-text'>search</i>");
				var icon = document.createElement("I");
				icon.className += "material-icons prefix turq-text";
				var iconText = document.createTextNode("search");
				icon.appendChild(iconText);
				var el = document.querySelector('#alert-table_filter label');
				el.insertBefore(icon, el.childNodes[0]);
			} else {
				document.getElementById("alert-list").innerHTML = "You do not have any alerts create yet. To create an alert, click on the <em>NEW ALERT</em> tab.";
			}
		}
	});
};



function showDeleteModal() {
	document.getElementById("alert-details").innerHTML = "Are you sure you want to delete this alert? This action cannot be undone.<br>Alert ID: " + urlParams.get('id');
	$('#delete-modal').modal('open');
}

function deleteAlert() {
	var url = "https://api.cryptocallback.com/deletealert/" + urlParams.get('id');
	method = "delete"; 
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	xhr.onload = function() {
		if (xhr.status >= 200 && xhr.status < 400) {
			var response = JSON.parse(xhr.responseText);
			if (response['message']) {
				// console.log(response);
				newToast("<em><strong>Success!</strong> Alert Deleted</em>", "success");
			}
			if (response['error']) { 
				// if invalid Alert: {"error":"An error has occurred"}
				if (response['error'] == "An error has occurred") {
					// console.log("An error has occurred");
					newToast("<em><strong>Error!</strong> Alert Invalid</em>", "fail");
				};
				// if already deleted: {"error":"account does not exist or has been already deleted"}
				if (response['error'] == "Account does not exist or has been already deleted") {
					newToast("<em><strong>Error!</strong> Alert Already Deleted</em>", "fail");
					// console.log("Account does not exist or has been already deleted");
				};
			};
		} else if (xhr.status == 404) {
			newToast("<em><strong>Error!</strong> Server Unavailable</em>", "fail");
		} else {
			newToast("<em><strong>Error!</strong> Something Went Wrong</em>", "fail");
		};
	};
	xhr.onerror = function() {
		newToast("<em><strong>Error!</strong> Delete Failed</em>", "fail");
	};
	xhr.send();
	$('#delete-modal').modal('close');
};
