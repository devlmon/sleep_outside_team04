import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Render the header and footer.
loadHeaderFooter();

// Set up and render the product list on the home page.
// Get category and set title.
const category = getParam("category");
const categoryTitle = category
  ? category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  : "";
document.querySelector(".title").textContent = categoryTitle;

// Instance of the ExternalServices class.
const dataSource = new ExternalServices();

// Get element to render in.
const listElement = document.querySelector(".product-list");

// Create an instance of the ProductList class and send it the correct information.
const productList = new ProductList(category, dataSource, listElement);

// Call the init method to show the products.
productList.init();
