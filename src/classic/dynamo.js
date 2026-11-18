import { api } from "../app/api";
class DocumentClient {
  scan(params, callback) {
    api("/products")
      .then((products) => {
        const values = Array.from({ length: 20 }, (_, i) => ({
          Price: i * 100000,
          Count: products.filter(
            (p) => p.price >= i * 100000 && p.price < (i + 1) * 100000,
          ).length,
          Lowest: i * 100000,
        }));
        callback(null, { Count: values.length, Items: values });
      })
      .catch((error) => callback(error));
  }
}
export default { DocumentClient };
