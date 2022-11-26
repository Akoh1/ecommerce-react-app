import { configureStore } from "@reduxjs/toolkit";
import ProductStore from "@/store/slice/ProductStore";
import AuthStore from "@/store/slice/AuthStore";

export default configureStore({
  reducer: {
    ProductStore: ProductStore,
    AuthStore: AuthStore,
  },
  devTools: true,
});
