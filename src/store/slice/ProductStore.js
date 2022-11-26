import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Products from "@/api/Products";
import { RequestStatus } from "@/utils/config";

const initialState = {
  ProductsObject: {
    Status: RequestStatus.idle,
    Response: null,
    Error: false,
  },
};

const namespace = "Products";

export const GetAllProducts = createAsyncThunk(
  `${namespace}/GetAllProducts`,
  async () => {
    const response = await Products.GetAllProducts();
    return response.data;
  }
);

export const ProductStore = createSlice({
  name: "ProductStore",
  initialState,
  reducers: {
    ResetProductsObjectState: (state) => {
      state.ProductsObject.Status = RequestStatus.idle;
      state.ProductsObject.Response = null;
      state.ProductsObject.Error = false;
    },
    // decrement: state => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // }
  },
  extraReducers(builder) {
    builder
      .addCase(GetAllProducts.pending, (state, action) => {
        state.ProductsObject.Status = RequestStatus.loading;
      })
      .addCase(GetAllProducts.fulfilled, (state, action) => {
        state.ProductsObject.Status = RequestStatus.succeeded;
        state.ProductsObject.Response = action.payload;
      })
      .addCase(GetAllProducts.rejected, (state, action) => {
        state.ProductsObject.Status = RequestStatus.failed;
        state.ProductsObject.Response = action.payload;
        state.ProductsObject.Error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { ResetProductsObjectState } = ProductStore.actions;

export default ProductStore.reducer;
