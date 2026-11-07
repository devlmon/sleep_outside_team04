function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

const productDataUrls = import.meta.glob("../json/*.json", {
  eager: true,
  import: "default",
  query: "?url",
});

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = productDataUrls[`../json/${category}.json`];
    if (!this.path) {
      throw new Error(`No product data found for category "${category}"`);
    }
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
