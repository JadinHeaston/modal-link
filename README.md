# Modal Link

This project was inspired because [como.gov](https://www.como.gov/) has modal dialogs that do this purpose but have some caveats:
- It is not easily configurable.
- It is slow.
- It is not always accessible as browsers update.
- It is difficult to maintain.
- Some amount of code is run on the server side.
	- This may just be required for the WordPress plugin functionality, but I haven't checked.

This project aspired to be a front-end only solution that used minimal tricks, piggy-backing off of native browser accessibility efforts.

## Table of Contents <!-- omit in toc -->

1. [Modal Link](#modal-link)
	1. [How does it work?](#how-does-it-work)
		1. [Defaults](#defaults)
		2. [Scripts.ts](#scriptsts)

## How does it work?

- All of the logic is handled within the [scripts.ts](./scripts.ts) file. The top of the file has predefined constants that can be used to configure what classes/IDs are used.
- All styling is done via the [styles.css](./styles.css) file. There are a couple variables at the top to easily modify key colors.
	- The rest can be modifed as desired!
	- There is some commented out transition styles. They work in Chrome, but not in Firefox.
		- These also add motion which can be a negative experience in terms of accessibility.

### Defaults

- [scripts.ts](./scripts.ts)
	- CLASS_NAME: `modal-link`
	- DIALOG_ID: `modal-link-dialog`
	- DIALOG_CLOSE_BUTTON_ID: `modal-link-dialog-close`
	- DIALOG_IFRAME_ID: `modal-link-dialog-iframe`
- [styles.css](./styles.css)
	- Light
		- --modal-link-dialog-background-color: `#FFFFFF`
		- --modal-link-dialog-backdrop-color: `rgb(0 0 0 / 33%)`
	- Dark
		- --modal-link-dialog-background-color:  `#000000`
		- --modal-link-dialog-backdrop-color: `rgb(0 0 0 / 33%)`

### Scripts.ts

The scripts file is VERY simple.

1. Listen to all link clicks.
2. Identify if it has the required class present. Return if not.
3. If it does, prevent the link from opening.
4. Check for an existing dialog with the provided ID, or create one as the **last child of \<main\>**.
5. Clear any existing content within the dialog and create the standard close button.
	- This includes creating the listener to actually do the closing!
6. Create the iFrame and use the links URL as the source. Place it inside of the dialog.
7. The dialog is created! Nothing happens until the close button is pressed. The dialog is then silently hidden, ready for any future dialogs.
   - By default when a keyboard input is used to 'click' the button focus is returned to the link! (Woo!!!)
