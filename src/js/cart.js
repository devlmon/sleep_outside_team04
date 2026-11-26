
import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Render the header and footer.
loadHeaderFooter();

// Create the shopping cart element.
const element = document.querySelector(".product-list");

// Create and initialize the shopping cart.
const shoppingCart = new ShoppingCart(element);
shoppingCart.init();
