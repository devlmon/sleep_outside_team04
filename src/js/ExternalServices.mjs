// SERVER URL
const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ExternalServices {
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

  // Send the prepared order as JSON and return the server response.
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(
      "https://wdd330-backend-osp8.onrender.com/checkout",
      options,
    );
    return convertToJson(response);
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
