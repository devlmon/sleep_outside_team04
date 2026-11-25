import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Create and initialize the shopping cart.
const element = document.querySelector(".product-list");
const shoppingCart = new ShoppingCart(element);
shoppingCart.init();

  // If the shopping cart is empty, the code inside the conditional statement will not be executed.
  if (cartItems && cartItems.length > 0) {
    const filterList = cartItems.filter((item, index) => {
      return cartItems.findIndex((product) => product.Id === item.Id) === index;
    });
    const htmlItems = filterList.map((item) => cartItemTemplate(item));
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
// Render the header and footer.
loadHeaderFooter();
