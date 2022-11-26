import axios from "axios";

const root = "/api";

const GetAllProducts = async () => {
  console.log("root: ", root);
  const data = await axios.get(`${root}/products`);
  return data;
};

const Products = {
  GetAllProducts,
};

export default Products;
