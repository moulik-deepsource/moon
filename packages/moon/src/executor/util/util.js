/**
 * Update an ariaset, dataset, or style attribute.
 *
 * @param {string} key
 * @param {Object} value
 * @param {Object} element
 */
export function updateAttributeSet(key, value, element) {
	if (key === "ariaset") {
		// Set aria-* attributes.
		for (let setKey in value) {
			element.setAttribute("aria-" + setKey, value[setKey]);
		}
	} else {
		// Set data-* and style attributes.
		const set = element[key];

		for (let setKey in value) {
			set[setKey] = value[setKey];
		}
	}
}

/**
 * Remove all the keys from an ariaset, dataset, or style attribute that aren't
 * in `exclude`.
 *
 * @param {string} key
 * @param {string} value
 * @param {Object} exclude
 * @param {Object} element
 */
export function removeAttributeSet(key, value, exclude, element) {
	for (let setKey in value) {
		if (!(setKey in exclude)) {
			switch (key) {
				case "ariaset":
					element.removeAttribute("aria-" + setKey);
					break;
				case "dataset":
					delete element.dataset[key];
					break;
				default:
					element.style[key] = "";
					break;
			}
		}
	}
}
