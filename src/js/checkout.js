import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Render the header and footer.
loadHeaderFooter();

const checkoutProcess = new CheckoutProcess("so-cart", "#order-summary");
checkoutProcess.init();
