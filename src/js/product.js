import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Get the product ID from the URL.
const productId = getParam("product");
// Set up the source of the data for tents.
const dataSource = new ExternalServices("tents");

// Create and initialize the product details for the selected product.
const product = new ProductDetails(productId, dataSource);
product.init();

// Render the header and footer.
loadHeaderFooter();
