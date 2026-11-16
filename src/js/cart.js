import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Create and initialize the shopping cart.
const element = document.querySelector(".product-list");
const shoppingCart = new ShoppingCart(element);
shoppingCart.init();

// Render the header and footer.
loadHeaderFooter();
