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
    // Get the elements that will be displayed depending on whether the shopping cart contains products to display.
    const emptyMessage = document.querySelector(".cart-empty");
    const cartFooter = document.querySelector(".cart-footer");

    // If the shopping cart is empty, the code inside the conditional statement will not be executed.
    if (cartItems && cartItems.length > 0) {
      // Display the items in the shopping cart.
      this.renderList(cartItems);

      // Hide the message indicating that the cart is empty.
      emptyMessage.classList.add("hide");

      // Calculate the total price of the products.
      const totalInCents = cartItems.reduce((total, item) => {
        const price = Number(item.FinalPrice);
        return total + Math.round(price * 100);
      }, 0);

      // Displays the page information and the “Checkout” button.
      cartFooter.classList.remove("hide");
      document.querySelector(".cart-total__amount").textContent =
        `$${(totalInCents / 100).toFixed(2)}`;
    } else {
      // Show the message indicating that the cart is empty.
      emptyMessage.classList.remove("hide");
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
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
}
