import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Account from "@/api/Account";
import { RequestStatus } from "@/utils/config";
import ErrorHandler from "@/utils/ErrorHandler";

const initialState = {
  isAuth: false,
  csrftoken: null,
  UserObject: {
    Status: RequestStatus.idle,
    Response: null,
    Error: false,
  },
  CreateUserObject: {
    Status: RequestStatus.idle,
    Response: null,
    Error: false,
  },
  Authenticating: {
    Status: RequestStatus.idle,
    Response: null,
    Error: false,
  },
};

const namespace = "Authentication";

export const CreateUser = createAsyncThunk(
  `${namespace}/createUser`,
  async (args, { rejectWithValue }) => {
    try {
      const response = await Account.Register(args);
      console.log("create user res: ", response);
      return response;
    } catch (error) {
      const message = ErrorHandler.ResponseError(error);
      return rejectWithValue(message);
    }
  }
);

export const LoginAuth = createAsyncThunk(
  `${namespace}/loginAuth`,
  async (args, { rejectWithValue }) => {
    try {
      const response = await Account.Login(args);
      return response;
    } catch (error) {
      const message = ErrorHandler.ResponseError(error);
      return rejectWithValue(message);
    }
  }
);

export const LogoutAuth = createAsyncThunk(
  `${namespace}/logoutAuth`,
  async (args) => {
    const response = await Account.Logout();
    return response.data;
  }
);

export const GetUser = createAsyncThunk(
  `${namespace}/getUser`,
  async (args) => {
    const response = await Account.GetUser();
    return response.data;
  }
);

export const AuthStore = createSlice({
  name: "AuthStore",
  initialState,
  reducers: {
    ResetUserObjectState: (state) => {
      state.UserObject.Status = RequestStatus.idle;
      state.UserObject.Response = null;
      state.UserObject.Error = false;
    },
    ResetCreateUserObjectState: (state) => {
      state.CreateUserObject.Status = RequestStatus.idle;
      state.CreateUserObject.Response = null;
      state.CreateUserObject.Error = false;
    },
    ResetAuthenticatingState: (state) => {
      state.Authenticating.Status = RequestStatus.idle;
      state.Authenticating.Response = null;
      state.Authenticating.Error = false;
    },
    setCRSFToken: (state, action) => {
      state.csrftoken = action.payload;
    },
    setAuth: (state) => {
      state.isAuth = true;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // }
  },
  extraReducers(builder) {
    builder
      .addCase(CreateUser.pending, (state, action) => {
        state.CreateUserObject.Status = RequestStatus.loading;
      })
      .addCase(CreateUser.fulfilled, (state, action) => {
        state.CreateUserObject.Status = RequestStatus.succeeded;
        console.log("Create user success: ", action.payload);
        state.CreateUserObject.Response = action.payload;
        localStorage.setItem("userData", action.payload);
      })
      .addCase(CreateUser.rejected, (state, action) => {
        state.CreateUserObject.Status = RequestStatus.failed;
        console.log("Create user failed: ", action.payload);
        state.CreateUserObject.Response = action.payload;
        state.CreateUserObject.Error = true;
      })
      .addCase(LoginAuth.pending, (state, action) => {
        state.Authenticating.Status = RequestStatus.loading;
      })
      .addCase(LoginAuth.fulfilled, (state, action) => {
        state.Authenticating.Status = RequestStatus.succeeded;
        console.log("Login success: ", action);
        state.Authenticating.Response = JSON.stringify(action.payload);
        state.isAuth = true;
      })
      .addCase(LoginAuth.rejected, (state, action) => {
        state.Authenticating.Status = RequestStatus.failed;
        console.log("loginfailed: ", action.payload);
        state.Authenticating.Response = action.payload.detail;
        state.Authenticating.Error = true;
      })
      .addCase(LogoutAuth.pending, (state, action) => {
        state.Authenticating.Status = RequestStatus.loading;
        state.Authenticating.Response = JSON.stringify(action.payload);
        state.Authenticating.Error = true;
      })
      .addCase(LogoutAuth.fulfilled, (state, action) => {
        localStorage.removeItem("userData");
        state.isAuth = false;
        state.Authenticating.Status = RequestStatus.succeeded;
        state.Authenticating.Response = action.payload;
      })
      .addCase(LogoutAuth.rejected, (state, action) => {
        state.Authenticating.Status = RequestStatus.failed;
        state.Authenticating.Response = action.payload;
        state.Authenticating.Error = true;
      })
      .addCase(GetUser.pending, (state, action) => {
        state.UserObject.Status = RequestStatus.loading;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.UserObject.Status = RequestStatus.succeeded;
        console.log("get user success: ", action.payload);
        state.UserObject.Response = action.payload;
        localStorage.setItem("userData", JSON.stringify(action.payload));
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.UserObject.Status = RequestStatus.failed;
        console.log("get user failed: ", action.payload);
        state.UserObject.Response = action.payload;
        state.UserObject.Error = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  ResetUserObjectState,
  ResetCreateUserObjectState,
  ResetAuthenticatingState,
  setCRSFToken,
  setAuth,
} = AuthStore.actions;

export default AuthStore.reducer;
