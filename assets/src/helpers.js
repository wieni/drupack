/**
 *  Toggle class
 */

export function toggleClass($element, className) {
    const classList = $element.classList;

    if (classList.contains(className)) {
        classList.remove(className);
    } else {
        classList.add(className);
    }
}
