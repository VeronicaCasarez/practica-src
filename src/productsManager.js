import fs from "fs";

class ProductManager {
  static productId = 1;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(product) {
    try {
      product.id = ProductManager.productId;
      ProductManager.productId++;

      this.products.push(product);

      await this.writeDataToFile(this.products);

      console.log("Producto agregado correctamente");
    } catch (err) {
      console.log(err);
    }
  }

  async getProducts() {
    try {
      const products = await this.readDataFromFile();
      return products;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const products = await this.readDataFromFile();
      const productFind = products.find((product) => product.id === id);
      if (!productFind) {
        console.log("Producto no encontrado");
      } else {
        console.log("Producto encontrado:", productFind);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const products = await this.readDataFromFile();
      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex !== -1) {
        const updatedProduct = { ...products[productIndex], ...updatedFields };
        products[productIndex] = updatedProduct;

        await this.writeDataToFile(products);

        console.log("Producto actualizado correctamente");
      } else {
        console.log("Producto no encontrado");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.readDataFromFile();
      const updatedProducts = products.filter((product) => product.id !== id);

      await this.writeDataToFile(updatedProducts);

      console.log("Producto eliminado correctamente");
    } catch (err) {
      console.log(err);
    }
  }

  async readDataFromFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async writeDataToFile(data) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(data), "utf-8");
    } catch (err) {
      console.log(err);
    }
  }
}
export default ProductManager;

