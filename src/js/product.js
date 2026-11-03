import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // An array is created for the shopping cart, and the added product is stored in that array.
  let cart = [];
  cart.push(product);

  // I check to see if there are any other products stored in localStorage; if so,
  // they are also added to the cart.
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    cartItems.forEach((item) => {
      cart.push(item);
    });
  }

  // The cart is then stored in localStorage.
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
