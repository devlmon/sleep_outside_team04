// SERVER URL
const baseURL = import.meta.env.VITE_SERVER_URL

export default class ProductData {
  // Category name, Path to the Category's JSON file. Inactive.
  constructor(category) {
    //this.category = category;
    //this.path = `/json/${this.category}.json`;
  }

  async getData(category) {
    // It retrieves information from the server and converts it into a format that JavaScript can read.
    const response = await fetch(`${baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    // Returns the data for the requested product.
    const response = await fetch(`${baseURL}product/${id} `);
    const product = await convertToJson(response);
    return product.Result;

    //const products = await this.getData();
    //return products.find((item) => item.Id === id);
  }
}

function convertToJson(res) {
  // Check to see if the JSON was successfully retrieved.
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}