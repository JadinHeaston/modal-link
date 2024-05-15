"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CLASS_NAME = 'modal-link';
const DIALOG_ID = 'modal-link-dialog';
const DIALOG_CLOSE_BUTTON_ID = 'modal-link-dialog-close';
const DIALOG_IFRAME_ID = 'modal-link-dialog-iframe';
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    document.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
        const target = event.target;
        if (!target || target.matches('a.' + CLASS_NAME) == false) {
            return false;
        }
        event.preventDefault();
        const link = target.href;
        console.log('Opening modal dialog:', link);
        const dialog = yield getOrCreateModalLinkDialog();
        yield setIframeInDialog(dialog, link);
        dialog.showModal();
    }), {
        passive: false
    });
}));
function getOrCreateModalLinkDialog() {
    return __awaiter(this, void 0, void 0, function* () {
        const mainElement = document.querySelector('main');
        if (!mainElement) {
            throw new Error('No <main> element found in the document.');
        }
        let dialog = document.getElementById(DIALOG_ID);
        if (!dialog) {
            dialog = document.createElement('dialog');
            dialog.id = DIALOG_ID;
            mainElement.appendChild(dialog);
        }
        else {
            while (dialog.firstChild) {
                dialog.removeChild(dialog.firstChild);
            }
        }
        const closeButton = document.createElement('button');
        closeButton.textContent = "X";
        closeButton.title = "Close dialog";
        closeButton.id = DIALOG_CLOSE_BUTTON_ID;
        closeButton.addEventListener("click", () => {
            dialog.close();
        });
        dialog.appendChild(closeButton);
        dialog.focus();
        return dialog;
    });
}
function setIframeInDialog(dialog, link) {
    return __awaiter(this, void 0, void 0, function* () {
        const iframe = document.createElement('iframe');
        iframe.id = DIALOG_IFRAME_ID;
        iframe.src = link;
        dialog.appendChild(iframe);
        return iframe;
    });
}
