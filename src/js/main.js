import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Set up and render the product list on the home page.
const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);

productList.init();
