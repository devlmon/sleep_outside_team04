import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Get the product ID from the URL.
const productId = getParam("product");
// Set up the source of the data for tents.
const dataSource = new ProductData("tents");

// Create and initialize the product details for the selected product.
const product = new ProductDetails(productId, dataSource);
product.init();
