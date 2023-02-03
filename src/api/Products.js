import axios from "axios";

const root = "/api";

const GetAllProducts = async () => {
  const data = await axios.get(`${root}/products`);
  return data;
};

const GetCart = async () => {
  const data = await axios.get(`${root}/cart`);
  return data;
};

const PostCart = async (body) => {
  const data = await axios.post(`${root}/cart`, body);
  return data;
};

const GetOrderItems = async () => {
  const data = await axios.get(`${root}/order/items`);
  return data;
};

const Products = {
  GetAllProducts,
  GetCart,
  PostCart,
  GetOrderItems,
};

export default Products;
