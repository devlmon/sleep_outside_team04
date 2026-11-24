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
expirationDate.min = `${currentDate.getFullYear()}-${String(
  currentDate.getMonth() + 1,
).padStart(2, "0")}`;

zipCode.addEventListener("input", () => {
  if (zipCode.value && zipCode.checkValidity()) {
    checkoutProcess.calculateOrderTotal();
  } else {
    checkoutProcess.clearOrderTotals();
  }
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkoutMessage.textContent =
    "Your details are valid, but order processing is not available in this demo.";
});
