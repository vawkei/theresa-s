import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: false,
  userName: "",
  userID: "",
  userEmail: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    SET_ACTIVE_USER(state, action) {
      //console.log(action.payload);
      state.isLoggedIn = true;
      console.log(state.isLoggedIn);
      state.userName = action.payload.userName;
      console.log(state.userName);
      state.userID = action.payload.userID;
      state.userEmail = action.payload.userEmail;
    },
    CLEAR_ACTIVE_USER(state, action) {
      state.isLoggedIn = false;
      console.log(state.isLoggedIn);
      state.userName = "";
      state.userID = "";
      state.userEmail = "";
    },
  },
});

const initialProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    ADD_PRODUCTS_TO_STORE(state, action) {
      const products = action.payload.reduxProducts
      //console.log(products);
      state.products = products
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer, products: productsSlice.reducer },
});

export const authActions = authSlice.actions;
export const productsActions = productsSlice.actions
export default store;
