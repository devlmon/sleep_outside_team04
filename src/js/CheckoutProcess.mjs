import ExternalServices from "./ExternalServices.mjs";
import { alertMessage, getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  // Set up cart state, order totals, and the service used to submit orders.
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.externalServices = new ExternalServices();
  }

  init() {
    // Load the saved cart before displaying its subtotal.
    this.list = getLocalStorage(this.key) ?? [];
    if (!Array.isArray(this.list)) {
      throw new TypeError("The saved cart must contain a list of items.");
    }
    this.calculateItemSubTotal();
    this.initCheckoutForm();
  }

  // Configure checkout-specific fields and connect their event handlers.
  initCheckoutForm() {
    const checkoutForm = document.querySelector("#checkout-form");
    const checkoutMessage = document.querySelector("#checkout-message");
    const expirationDate = document.querySelector("#expiration-date");
    const zipCode = document.querySelector("#zip-code");
    const currentDate = new Date();

    // Prevent the customer from selecting an expiration month in the past.
    expirationDate.min = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1,
    ).padStart(2, "0")}`;

    // Recalculate estimates only while the entered ZIP code is valid.
    zipCode.addEventListener("input", () => {
      if (zipCode.value && zipCode.checkValidity()) {
        this.calculateOrderTotal();
      } else {
        this.clearOrderTotals();
      }
    });

    // Prevent the page from reloading and check the checkout result.
    checkoutForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      checkoutMessage.textContent = "Submitting your order...";

      try {
        await this.checkout(checkoutForm);
      } catch (error) {
        checkoutMessage.textContent = "";
        alertMessage(`Order could not be submitted: ${error.message}`);
      }
    });
  }

  calculateItemSubTotal() {
    // Sum rounded cents to avoid floating-point errors in currency values.
    const itemTotalInCents = this.list.reduce((total, item) => {
      const price = Number(item.FinalPrice);
      if (!Number.isFinite(price) || price < 0) {
        throw new TypeError("A cart item has an invalid price.");
      }
      return total + Math.round(price * 100);
    }, 0);

    this.itemTotal = itemTotalInCents / 100;
    this.displayItemSubTotal();
  }

  // Update the subtotal amount and the number of items shown in the summary.
  displayItemSubTotal() {
    const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
    const itemCount = document.querySelector(
      `${this.outputSelector} #item-count`,
    );

    subtotal.textContent = this.formatCurrency(this.itemTotal);
    itemCount.textContent = `(${this.list.length} ${
      this.list.length === 1 ? "item" : "items"
    })`;
  }

  calculateOrderTotal() {
    // Apply the shared tax rate and shipping estimate to the cart subtotal.
    const itemTotalInCents = Math.round(this.itemTotal * 100);
    this.tax = Math.round(itemTotalInCents * 0.06) / 100;
    this.shipping =
      this.list.length === 0 ? 0 : 10 + (this.list.length - 1) * 2;
    this.orderTotal =
      (itemTotalInCents + Math.round(this.tax * 100) + this.shipping * 100) /
      100;

    this.displayOrderTotals();
  }

  clearOrderTotals() {
    // Keep estimates hidden until the ZIP code is valid.
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
    this.displayOrderTotals(false);
  }

  // Render the current order estimates or hide them when they are unavailable.
  displayOrderTotals(showTotals = true) {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const total = document.querySelector(`${this.outputSelector} #total`);
    // Hide estimates until the ZIP code has passed validation.
    const displayValue = (amount) =>
      showTotals ? this.formatCurrency(amount) : "—";

    tax.textContent = displayValue(this.tax);
    shipping.textContent = displayValue(this.shipping);
    total.textContent = displayValue(this.orderTotal);
  }

  // Format a numeric amount as US dollars.
  formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  // Prepare and submit the order, then clear the cart and open the success page.
  async checkout(form) {
    this.calculateOrderTotal();
    const order = formDataToJSON(form);
    const [year, month] = order.expiration.split("-");

    // Match the server's expected field names and expiration format.
    order.orderDate = new Date().toISOString();
    order.expiration = `${Number(month)}/${year.slice(-2)}`;
    order.cardNumber = order.cardNumber.replace(/\s/g, "");
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);
    order.items = packageItems(this.list);

    await this.externalServices.checkout(order);
    localStorage.removeItem(this.key);
    window.location.href = "/checkout/success.html";
  }
}

// Convert saved product records to the smaller order-item structure...
function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: Number(item.FinalPrice),
    quantity: 1,
  }));
}

// Build an object whose keys match the form input names.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
