import { createSlice, configureStore } from "@reduxjs/toolkit";

//SLICE 0N£ : AUTHSLICE
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



//SLICE TW0 : PRODUCTSLICE
const initialProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    ADD_PRODUCTS_TO_STORE(state, action) {
      const products = action.payload.reduxProducts;
      //console.log(products);
      state.products = products;
    },
  },
});



//SLICE THR££ : FILTERSLICE
const initialFilterSlice = { filteredProducts: [] };

const filteredSlice = createSlice({
  name: "filter",
  initialState: initialFilterSlice,
  reducers: {
    FILTERPRODUCT_BY_CATEGORY(state, action) {
     // console.log(action.payload);
      const { products, category } = action.payload;
      // console.log(products);
      // console.log(category);

      let temporaryProducts = [];
      if (category === "ALL") {
        temporaryProducts = products;
      } else {
        temporaryProducts = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = temporaryProducts;
    },
    FILTERPRODUCT_BY_BRAND(state, action) {
      const { products, brand } = action.payload;

      let temporaryProducts = [];

      if (brand === "ALL") {
        temporaryProducts = products;
      } else {
        temporaryProducts = products.filter(
          (product) => product.brand === brand
        );
      }
      state.filteredProducts = temporaryProducts;
    },
    FILTERPRODUCT_BY_SEARCH(state, action) {
      // console.log(action.payload)
      const { products, search } = action.payload;

      const temporaryProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.brand.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = temporaryProducts;
    },
    SORT_PRODUCTS(state, action) {
      //console.log(action.payload);
      const { products, sort } = action.payload;
      
      let temporaryProducts = [];
      if (sort === "Latest") {
        temporaryProducts = products;
      }
      if (sort === "Lowest Price") {
        temporaryProducts = products.slice().sort((a, b) => a.price - b.price);
      }
      if (sort === "Highest Price") {
        temporaryProducts = products.slice().sort((a, b) => b.price - a.price);
      }
      state.filteredProducts = temporaryProducts;
    },


 
  },
})

    //SLICE F0UR : CARTSLICE
    const initialCartSlice = {
      cartItems:[],
      cartTotalQty : 0,
      cartTotalAmnt : 0
    };

    const cartSlice =  createSlice({
      name:'cart',
      initialState:initialCartSlice,
      reducers:{
        ADDPRODUCT_TO_STORE(state,action){
          console.log(action.payload)
          const newItem= action.payload;
          const existingItem = state.cartItems.find((item)=>
           item.id === newItem.id
          );
          if(!existingItem){
             state.cartTotalQty ++;
              state.cartItems.push({...action.payload,quantity:1})
              console.log(state.cartItems)
              console.log(`${action.payload.name} added to cart`);
          }else{
            state.cartTotalQty ++;
            existingItem.quantity = existingItem.quantity + 1
            console.log(`${action.payload.name} increased by 1`);
          }  
        },
        DECREASEPRODUCT_FROM_CART(state,action){
         // console.log(action.payload)
         const newItem = action.payload;
         const existingItem = state.cartItems.find((item)=>item.id===newItem.id);

         if(existingItem.quantity===1){
          state.cartItems= state.cartItems.filter((item)=>item.id !==newItem.id)
          state.cartTotalQty= state.cartTotalQty -1;
         }else{
          state.cartTotalQty= state.cartTotalQty - 1;
          existingItem.quantity = existingItem.quantity -1
         }
        }
      }
    });


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    filter: filteredSlice.reducer,
    cart:cartSlice.reducer
  },
});

export const authActions = authSlice.actions;
export const productsActions = productsSlice.actions;
export const filterActions = filteredSlice.actions;
export const cartActions = cartSlice.actions;
export default store;
