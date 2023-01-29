import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Products from "@/api/Products";
import { RequestStatus } from "@/utils/config";
import ErrorHandler from "@/utils/ErrorHandler";

const initialState = {
  ProductsObject: {
    Status: RequestStatus.idle,
    Response: null,
    Error: false,
  },
  CartObject: {
    Status: RequestStatus.idle,
    Response: null,
    Error: false,
  },
  ItemsObject: {
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

export const ShowCart = createAsyncThunk(
  `${namespace}/showCart`,
  async (args, { rejectWithValue }) => {
    try {
      const response = await Products.GetCart(args);
      return response;
    } catch (error) {
      const message = ErrorHandler.ResponseError(error);
      return rejectWithValue(message);
    }
  }
);

export const GetCartItems = createAsyncThunk(
  `${namespace}/GetCartItems`,
  async () => {
    const response = await Products.GetOrderItems();
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
      })
      .addCase(ShowCart.pending, (state, action) => {
        state.CartObject.Status = RequestStatus.loading;
      })
      .addCase(ShowCart.fulfilled, (state, action) => {
        state.CartObject.Status = RequestStatus.succeeded;
        state.CartObject.Response = action.payload;
      })
      .addCase(ShowCart.rejected, (state, action) => {
        state.CartObject.Status = RequestStatus.failed;
        state.CartObject.Response = action.payload;
        state.CartObject.Error = true;
      })
      .addCase(GetCartItems.pending, (state, action) => {
        state.ItemsObject.Status = RequestStatus.loading;
      })
      .addCase(GetCartItems.fulfilled, (state, action) => {
        state.ItemsObject.Status = RequestStatus.succeeded;
        state.ItemsObject.Response = action.payload;
      })
      .addCase(GetCartItems.rejected, (state, action) => {
        state.ItemsObject.Status = RequestStatus.failed;
        state.ItemsObject.Response = action.payload;
        state.ItemsObject.Error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const { ResetProductsObjectState } = ProductStore.actions;

export default ProductStore.reducer;
