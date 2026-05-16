
export function triggerFormSubmit(el) {
    const form = el?.form;

    if (form) {
        // Preferred: triggers real submit event
        if (typeof form.requestSubmit === 'function') {
            form.requestSubmit();
        } else {
            // Fallback for older browsers (use a fake submit button)
            const tempBtn = document.createElement('button');
            tempBtn.type = 'submit';
            tempBtn.style.display = 'none';
            form.appendChild(tempBtn);
            tempBtn.click();
            form.removeChild(tempBtn);
        }
    }
}

export function triggerElementAction(el) {
    if (typeof el.click === 'function') {
        el.click();
    }
}

export function isVisible(el) {
    const style = window.getComputedStyle(el);
    return (
        !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length) &&
        style.visibility !== 'hidden' &&
        style.display !== 'none' &&
        parseFloat(style.opacity) > 0
    );
}

export function isChildElement(child, target) {
    if(target === child) {
        return true
    }
    if(!!child.parentElement) {
        return isChildElement(child.parentElement, target)
    }
    return false
}

export function performNativeKeyPress(element, keyCode) {
    element.dispatchEvent(new KeyboardEvent("keydown", { keyCode: keyCode, which: keyCode, bubbles: true }));
    element.dispatchEvent(new KeyboardEvent("keypress", { keyCode: keyCode, which: keyCode, bubbles: true }));
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new KeyboardEvent("keyup", { keyCode: keyCode, which: keyCode, bubbles: true }));
    // change intentionally not dispatched per key — fires naturally on blur,
    // and dispatching it eagerly upsets framework form-validation listeners.
}