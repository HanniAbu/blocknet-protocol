// Usage:
// newToast("<em><strong>Success!</strong> Alert Submitted</em>", "success")
// newToast("<em><strong>Error!</strong> Submission Fails</em>", "fail")
// newToast("Warning message here", "warn");
// newToast("Informative message here", "info");

function newToast(message, color) {
	var notification;
	var toast = document.getElementById('toast');
	toast.innerHTML = '<div id="notification" style="" class="' + color + '">' + message + '</div>';
	var nHeight = document.getElementById('notification').offsetHeight;
	notification = document.getElementById('notification');
	notification.classList.add("anim");
	notification.style.top = 0;
	setTimeout(hideToast,3000);
};

function hideToast() {
	var notification = document.getElementById('notification');
	notification.style.top = "-34px";
};

