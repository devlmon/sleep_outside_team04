import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // Load the saved cart items and display them.
  const cartItems = getLocalStorage("so-cart");

  // If the shopping cart is empty, the code inside the conditional statement will not be executed.
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function cartItemTemplate(item) {
  // Pre-built structure of the cart items.
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}"/>
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

// Set up and render the cart content on the cart page.
renderCartContents();
