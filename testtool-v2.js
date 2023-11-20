// Create the panel wrapper element
var panelWrapper = document.createElement('div');
panelWrapper.setAttribute('id', 'test-panel');
panelWrapper.setAttribute('role', 'region');
panelWrapper.setAttribute('aria-labelledby', 'panel-title');

// Define CSS for the panel
var panelStyles = `
	position: fixed;
	top: 50px;
	left: 50px;
	width: 200px;
	height: auto;
	border: 1px solid #ccc;
	zIndex: 9999;
	cursor: move;
	padding: .25rem;
	background-color: #fff;
	font-family: sans-serif;
`;

// Apply the CSS styles directly to the panel
panelWrapper.style.cssText = panelStyles;

// Make the panel draggable
makeDraggable(panelWrapper);

// Add an event listener to the document for the keydown event
document.addEventListener('keydown', function(event) {
	// Check if Shift key and 't' key are pressed simultaneously
	if (event.shiftKey && event.key === 'T') {
		// Shift focus to the panel wrapper
		panelWrapper.focus();
	}
});

// Create a panel title (h1) with yellow color
var panelTitle = document.createElement('h1');
panelTitle.setAttribute('id', 'panel-title');
panelTitle.innerText = 'Allianz A11Y Helper';
panelTitle.style.fontSize = '1rem';
panelTitle.style.padding = '0';

// Create a panel introduction (p) with blue color
var panelIntroduction = document.createElement('p');
panelIntroduction.innerText = 'This is the test panel. I hope it\'s useful.';
panelIntroduction.style.fontSize = '1rem';

// Create the close button with "&times" icon
var PanelCloseButton = document.createElement('button');
PanelCloseButton.innerHTML = '&times';
PanelCloseButton.setAttribute('aria-label', 'Close Panel');
PanelCloseButton.style.position = 'absolute';
PanelCloseButton.style.top = '5px';
PanelCloseButton.style.right = '5px';
PanelCloseButton.addEventListener('click', function() {
	closePanel();
});

// Create the "Change Headline Color" button
var changeColorButton = document.createElement('button');
changeColorButton.innerText = 'Change Headline Color';
changeColorButton.addEventListener('click', function() {
	changeHeadlineColor();
});

// Create the "Validate Code" button
var validateCodeButton = document.createElement('button');
validateCodeButton.innerText = 'Validate Code';
validateCodeButton.addEventListener('click', function() {
	validateCode();
});

// Append elements to the panel
panelWrapper.appendChild(panelTitle);
panelWrapper.appendChild(panelIntroduction);
panelWrapper.appendChild(changeColorButton);
panelWrapper.appendChild(validateCodeButton);
panelWrapper.appendChild(PanelCloseButton);

// Append the panel to the document
document.body.appendChild(panelWrapper);

// Function to close the panel
function closePanel() {
	// Remove the panel from the document
	document.body.removeChild(panelWrapper);
}

// Function to make an element draggable
function makeDraggable(element) {
	var isDragging = false;
	var offsetX, offsetY;

	element.addEventListener('mousedown', function(event) {
		isDragging = true;
		offsetX = event.clientX - element.getBoundingClientRect().left;
		offsetY = event.clientY - element.getBoundingClientRect().top;
	});

	document.addEventListener('mousemove', function(event) {
		if (isDragging) {
			element.style.left = event.clientX - offsetX + 'px';
			element.style.top = event.clientY - offsetY + 'px';
		}
	});

	document.addEventListener('mouseup', function() {
		isDragging = false;
	});
}

// Function to change headline color to red, excluding elements within the panel
function changeHeadlineColor() {
	var headlines = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

	headlines.forEach(function(headline) {
		// Check if the headline is not within the panel
		if (!panelWrapper.contains(headline)) {
			headline.style.color = 'red';
		}
	});

	console.log('Headlines color changed to red.');
}

// Function to validate code using W3C Validator; Source from https://dequeuniversity.com/validator#bookmarklet-source
function validateCode() {
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
	form.method = 'POST';
	form.action = 'https://validator.w3.org/nu/?showsource=yes&nocache=' + Math.random();
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
