import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Render the header and footer.
loadHeaderFooter();

const checkoutProcess = new CheckoutProcess("so-cart", "#order-summary");
checkoutProcess.init();

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
    checkoutProcess.calculateOrderTotal();
  } else {
    checkoutProcess.clearOrderTotals();
  }
});

// Keep the browser from submitting sensitive form values as a normal request.
checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  checkoutMessage.textContent = "Submitting your order...";

  try {
    await checkoutProcess.checkout(checkoutForm);
    checkoutMessage.textContent = "Order submitted. Server response received.";
  } catch (error) {
    checkoutMessage.textContent = `Order could not be submitted: ${error.message}`;
  }
});
