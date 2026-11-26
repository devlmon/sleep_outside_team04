import { getLocalStorage, getProductImageUrl, renderListWithTemplate } from "./utils.mjs";

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
      // Remove duplicate products and calculate their quantities.
        const uniqueItems = cartItems.reduce((accumulator, item) => {

        const existingItem = accumulator.find(
            product => product.Id === item.Id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            accumulator.push({ ...item, quantity: 1 });
        }

        return accumulator;

      }, []);

      this.renderList(uniqueItems);
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
        <img src="${getProductImageUrl(item.Images)}" alt="${item.Name}"/>
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: ${item.quantity}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
}
