var sheet = document.createElement('style');
sheet.innerHTML =
	"#testtoolWrapper {position: absolute; bottom:.5rem;right:.5rem; background-color:lightgrey; border: 1px solid #333} \n"
+ "table ul {margin-top: 0 !important;margin-bottom: 0 !important;}\n"
;

function createTestWrapper() {
	// Create testtool wrapper
	var testtoolWrapper = document.createElement("div");
		testtoolWrapper.setAttribute('id', 'testtoolWrapper');
		//testtoolWrapper.style.backgroundColor = 'red';

	document.body.appendChild(testtoolWrapper);

	var btn = document.createElement("button");
		btn.innerHTML = "Validate HTML";
		btn.setAttribute('id', 'js-ttValidate');
		btn.addEventListener("click", validate, false);

	document.getElementById("testtoolWrapper").appendChild(sheet);
	document.getElementById("testtoolWrapper").appendChild(btn);
}

function validate () {
	// https://dequeuniversity.com/validator#bookmarklet-source
	var doctypeNode = document.doctype;
	var doctypeHtml = "<!DOCTYPE "
	+ doctypeNode.name
	+ (doctypeNode.publicId ? ' PUBLIC "' + doctypeNode.publicId + '"' : '')
	+ (!doctypeNode.publicId && doctypeNode.systemId ? ' SYSTEM' : '')
	+ (doctypeNode.systemId ? ' "' + doctypeNode.systemId + '"' : '')
	+ '>';

	var htmlWrapper = document.documentElement.outerHTML;
	var allContent = doctypeHtml + htmlWrapper;

	var validatorForm = document.getElementById('deque-w3c-validator-bookmarklet');
	if (validatorForm) {
	validatorForm.remove();
	}
 var form = document.createElement('form');
	form.id = 'deque-w3c-validator-bookmarklet';
	form.method = "POST";
	form.action = "https://validator.w3.org/nu/?showsource=yes&nocache=" + Math.random();
	form.target = '_blank';
	form.enctype = 'multipart/form-data';

	var textarea = document.createElement('textarea');
	textarea.name = 'content';
	textarea.value = allContent;

	form.appendChild(textarea);

	document.body.appendChild(form);

	form.submit();

	var validatorForm = document.getElementById('deque-w3c-validator-bookmarklet');
	if (validatorForm) {
	validatorForm.remove();
	}
}

// Define a convenience method and use it
var ready = (callback) => {
	if (document.readyState != "loading") callback();
	else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {
	// console.log('Im ready');
	createTestWrapper();
});