import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    // ID, Product Data, and Data Source. 
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // Get the details for the current product.
        this.product = await this.dataSource.findProductById(this.productId);
        // Rendering the HTML.
        this.renderProductDetails();
        // Added listener to the Add to Cart button.
        document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart(product) {
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

    renderProductDetails() {
        // It calls and render a function that contains the pre-built structure of the product page.
        document.querySelector("main").innerHTML = productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    // Pre-built structure of the product page.
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
            <h2 class="divider">${product.NameWithoutBrand}</h2>
            <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}"/>
            <p class="product-card__price">$${product.FinalPrice}</p>
            <p class="product__color">${product.Colors[0].ColorName}</p>
            <p class="product__description">${product.DescriptionHtmlSimple}</p>
            <div class="product-detail__add">
                <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
            </div>
        </section>`;
}