import { api } from "../app/api";
class DocumentClient {
  scan(params, callback) {
    api("/products")
      .then((products) => {
        const values = Array.from({ length: 50 }, (_, i) => ({
          Price: i,
          Count: products.filter(
            (p) => p.price >= i * 50000 && p.price < (i + 1) * 50000,
          ).length,
          Lowest: 0,
        }));
        callback(null, { Count: values.length, Items: values });
      })
      .catch((error) => callback(error));
  }
}
export default { DocumentClient };
