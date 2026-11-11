// It returns the element that matches the selector.
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

// It retrieves and parses data stored in localStorage.
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// It saves data in localStorage as JSON.
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// It adds touchend and click listeners to the selected element.
export function setClick(selector, callback) {
    qs(selector).addEventListener("touchend", (event) => {
        event.preventDefault();
        callback();
    });
    qs(selector).addEventListener("click", callback);
}

// It returns the requested parameter from the URL.
export function getParam(param) {
    // It gets the query string from the current URL.
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // It retrieves the value of the requested parameter.
    const product = urlParams.get(param);
    return product;
}

// Render items with a template, optionally clearing existing content first.
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}