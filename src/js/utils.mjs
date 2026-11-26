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

// Show a dismissible message that automatically disappears after four seconds.
export function alertMessage(message, scroll = true) {
    const main = qs("main");
    const existingAlert = main.querySelector(".alert");
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.setAttribute("role", "alert");

    const alertText = document.createElement("span");
    alertText.classList.add("alert__message");
    alertText.textContent = message;

    const closeButton = document.createElement("button");
    closeButton.classList.add("alert__close");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("aria-label", "Dismiss message");
    closeButton.textContent = "×";
    // Let users dismiss the alert before its timeout.
    closeButton.addEventListener("click", () => alert.remove());

    alert.append(alertText, closeButton);
    main.prepend(alert);
    // Remove the alert after its four-second display period.
    window.setTimeout(() => alert.remove(), 4000);

    if (scroll) {
        window.scrollTo(0, 0);
    }
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

export function getProductImageUrl(images) {
    // Depending on the window's resolution, choose the most appropriate image to display.
    const width = window.innerWidth;

    if (width < 400) {
        return images.PrimarySmall;
    }
    if (width < 700) {
        return images.PrimaryMedium;
    }
    if (width < 1000) {
        return images.PrimaryLarge;
    }
    return images.PrimaryExtraLarge;
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

export function renderWithTemplateIvan(templatefn, parentElement, data,position="afterbegin", clear=false){
    const htmlString= data.map(templatefn).join("");
    if (clear){
        parentElement.innerHTML="";
    }
    parentElement.insertAdjacentHTML(position, htmlString);
}


// Render a template.
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    }
}

// This asynchronous function fetches the content of the HTML file given a path.
export async function loadTemplate(path) {
    const res = await fetch(path);
    if (!res.ok) {
        throw new Error(`Failed to load template at ${path}: ${res.status} ${res.statusText}`);
    }
    const template = await res.text();
    return template;
}

// Load and render the header and footer templates in from the partials.
export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");

    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}
