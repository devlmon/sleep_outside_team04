import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
  constructor(listElement) {
    // Name of the HTML Element.
    this.listElement = listElement;
  }

  init() {
    // Set up and render the cart content on the cart page.
    // Load the saved cart items.
    const cartItems = getLocalStorage("so-cart");

    // If the shopping cart is empty, the code inside the conditional statement will not be executed.
    if (cartItems && cartItems.length > 0) {
      this.renderList(cartItems);
    }
  }

  renderList(cartItems) {
    // Render the cart items obtained from localStorage.
    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems, "afterbegin", true);
  }
}

function cartItemTemplate(item) {
  // Pre-built structure of the cart items.
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Images.PrimaryMedium}" alt="${item.Name}"/>
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
}
