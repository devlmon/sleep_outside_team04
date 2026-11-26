import { resolve } from "path";
import { defineConfig } from "vite";

// Build the site from its source directory as a multi-page app.
export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      // Include every page entry in the production build.
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        checkout_success: resolve(__dirname, "src/checkout/success.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        product_listing: resolve(__dirname, "src/product_listing/index.html"),
      },
    },
  },
});
