const CLASS_NAME = 'modal-link';
const DIALOG_ID = 'modal-link-dialog';
const DIALOG_CLOSE_BUTTON_ID = 'modal-link-dialog-close';
const DIALOG_IFRAME_ID = 'modal-link-dialog-iframe';

document.addEventListener("DOMContentLoaded", async () => {// Add event listener to the document for click events
	document.addEventListener('click', async (event: MouseEvent) => {
		const target = event.target as HTMLAnchorElement;

		// Check if the clicked element is an anchor tag with the class 'modal-link'
		if (!target || target.matches('a.' + CLASS_NAME) == false) {
			return false;
		}

		event.preventDefault(); // Cancel the default link opening
		const link = target.href;
		console.log('Opening modal dialog:', link);

		//Creating dialog element.
		const dialog = await getOrCreateModalLinkDialog();
		//Insert the content.
		await setIframeInDialog(dialog, link);

		//Displaying dialog.
		dialog.showModal();
	}, {
		passive: false
	});
});

async function getOrCreateModalLinkDialog(): Promise<HTMLDialogElement> {
	// Find the <main> element
	const mainElement = document.querySelector('main');

	if (!mainElement) {
		throw new Error('No <main> element found in the document.');
	}

	// Check if the #modal-link-popover already exists
	let dialog = document.getElementById(DIALOG_ID) as HTMLDialogElement;

	if (!dialog) {
		// Create the dialog form if it doesn't exist
		dialog = document.createElement('dialog');
		dialog.id = DIALOG_ID;

		// Append the new dialog form to the end of <main>
		mainElement.appendChild(dialog);
	}
	else {
		// Remove all existing children from the dialog
		while (dialog.firstChild) {
			dialog.removeChild(dialog.firstChild);
		}
	}

	const closeButton = document.createElement('button');
	closeButton.textContent = "X";
	closeButton.title = "Close dialog";
	closeButton.id = DIALOG_CLOSE_BUTTON_ID;

	// "Close" button closes the dialog
	closeButton.addEventListener("click", () => {
		dialog.close();
	});

	dialog.appendChild(closeButton);
	dialog.focus();

	return dialog;
}

async function setIframeInDialog(dialog: HTMLDialogElement, link: string): Promise<HTMLIFrameElement> {
	// Create the iframe element
	const iframe = document.createElement('iframe');
	iframe.id = DIALOG_IFRAME_ID;
	iframe.src = link;

	// Append the iframe to the dialog
	dialog.appendChild(iframe);
	return iframe;
}
