export default class ProductData {
  // Category name, Path to the Category's JSON file.
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  getData() {
    // Parses the JSON content and returns a promise with the data.
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async findProductById(id) {
    // Returns the data for the requested product.
    const products = await this.getData();
    return products.find((item) => item.Id === id);
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