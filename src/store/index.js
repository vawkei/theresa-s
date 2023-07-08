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
});

//SLICE F0UR : CARTSLICE
const initialCartSlice = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  // cartItems: [],
  cartTotalQty:
    localStorage.getItem("totalQuantity") !== null
      ? JSON.parse(localStorage.getItem("totalQuantity"))
      : 0,

  cartTotalAmnt:
    localStorage.getItem("totalAmount") !== null
      ? JSON.parse(localStorage.getItem("totalAmount"))
      : 0,

  prevUrl: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartSlice,
  reducers: {
    ADDPRODUCT_TO_STORE(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        //Item already exists in the cart
        //Increase the cartQuantity
        // state.cartTotalQty ++;
        state.cartItems[productIndex].quantity += 1;
        console.log(`${action.payload.name} increased by one`);
      } else {
        //Item doesn't exist in the cart
        //Add item to the cart
        const tempProduct = { ...action.payload, quantity: 1 };
        state.cartItems.push(tempProduct);
        console.log(`${action.payload.name} added to cart`);
      }
      // save cart to Local Storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.cartTotalQty = calculateCartTotalQty(state.cartItems);
      state.cartTotalAmnt = calculateCartTotalAmnt(state.cartItems);
    },

    DECREASEPRODUCT_FROM_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[productIndex].quantity > 1) {
        state.cartItems[productIndex].quantity -= 1;
        console.log(`${action.payload.name} decreased by one`);
      } else if (state.cartItems[productIndex].quantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
        console.log(`${action.payload.name} removed from cart`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.cartTotalQty = calculateCartTotalQty(state.cartItems);
      state.cartTotalAmnt = calculateCartTotalAmnt(state.cartItems);

      // state.cartTotalQty = calculateCartTotalQty(state.cartItems);
      // state.cartTotalAmnt = calculateCartTotalAmnt(state.cartItems);
    },
    CART_TOTALQUANTITY(state) {
      const array = [];
      state.cartItems.map((item) => {
        const { quantity } = item;
        const cartQty = quantity;
        return array.push(cartQty);
      });
      const totalQty = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQty = totalQty;
      localStorage.setItem("totalQuantity", JSON.stringify(state.cartTotalQty));
    },
    CART_TOTALAMOUNT(state) {
      const array = [];
      state.cartItems.map((item) => {
        const { price, quantity } = item;
        const cartItemAmount = price * quantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmnt = totalAmount;
      //localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      localStorage.setItem("totalAmount", JSON.stringify(state.cartTotalAmnt));
    },
    REMOVEPRODUCT_FROM_CART(state, action) {
      // console.log(action.payload);
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== product.id
        );
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.cartTotalQty = calculateCartTotalQty(state.cartItems);
      state.cartTotalAmnt = calculateCartTotalAmnt(state.cartItems);
    },
    CLEAR_CART(state) {
      state.cartItems = [];
      // localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
      localStorage.clear();
      state.cartTotalQty = 0;
      state.cartTotalAmnt =0;
    },
    SAVE_URL(state, action) {
      console.log(action.payload);
      state.prevUrl = action.payload;
    },
  },
});

const initialCheckoutState = {
  firstName: '',
  surname: '',
  residentialAddress: '',
  town: '',
  userState: '',
  phoneNumber: '',
  //they are all different states and not an array.
}

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialCheckoutState,
  reducers: {
    ADDPRODUCT_TO_CHECKOUT(state, action) {
      // console.log(action.payload);
      // state.firstName=action.payload.firstName;
      // state.surname = action.payload.surname;
      // state.residentialAddress = action.payload.residentialAddress;
      // state.phoneNumber = action.payload.phoneNumber;
      // state.town = action.payload.town;
      // state.userState = action.payload.userState
      state = {
        ...state,
        ...action.payload,
      };
    },
  },
});

const initialOrdersState ={orders:{}};

const orderSlice = createSlice({
  name:"orders",
  initialState:initialOrdersState,
  reducers:{
    ADDORDERS_TO_STORE(state,action){
      const orders = action.payload.orders
      //console.log(orders);
    }
  }
})

const calculateCartTotalQty = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};
const calculateCartTotalAmnt = (cartTotalAmnt) => {
  return cartTotalAmnt.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    filter: filteredSlice.reducer,
    cart: cartSlice.reducer,
    checkout: checkoutSlice.reducer,
    orders: orderSlice.reducer
  },
});

export const authActions = authSlice.actions;
export const productsActions = productsSlice.actions;
export const filterActions = filteredSlice.actions;
export const cartActions = cartSlice.actions;
export const checkoutActions = checkoutSlice.actions;
export const ordersAction = orderSlice.actions
export default store;

//0RIGINAL:THE FIRST ONE BEFORE I REWROTE, TO WORK LOCALSTORAGE

// import { createSlice, configureStore } from "@reduxjs/toolkit";

// //SLICE 0N£ : AUTHSLICE
// const initialAuthState = {
//   isLoggedIn: false,
//   userName: "",
//   userID: "",
//   userEmail: "",
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialAuthState,
//   reducers: {
//     SET_ACTIVE_USER(state, action) {
//       //console.log(action.payload);
//       state.isLoggedIn = true;
//       console.log(state.isLoggedIn);
//       state.userName = action.payload.userName;
//       console.log(state.userName);
//       state.userID = action.payload.userID;
//       state.userEmail = action.payload.userEmail;
//     },
//     CLEAR_ACTIVE_USER(state, action) {
//       state.isLoggedIn = false;
//       console.log(state.isLoggedIn);
//       state.userName = "";
//       state.userID = "";
//       state.userEmail = "";
//     },
//   },
// });

// //SLICE TW0 : PRODUCTSLICE
// const initialProductsState = {
//   products: [],
// };

// const productsSlice = createSlice({
//   name: "products",
//   initialState: initialProductsState,
//   reducers: {
//     ADD_PRODUCTS_TO_STORE(state, action) {
//       const products = action.payload.reduxProducts;
//       //console.log(products);
//       state.products = products;
//     },
//   },
// });

// //SLICE THR££ : FILTERSLICE
// const initialFilterSlice = { filteredProducts: [] };

// const filteredSlice = createSlice({
//   name: "filter",
//   initialState: initialFilterSlice,
//   reducers: {
//     FILTERPRODUCT_BY_CATEGORY(state, action) {
//      // console.log(action.payload);
//       const { products, category } = action.payload;
//       // console.log(products);
//       // console.log(category);

//       let temporaryProducts = [];
//       if (category === "ALL") {
//         temporaryProducts = products;
//       } else {
//         temporaryProducts = products.filter(
//           (product) => product.category === category
//         );
//       }
//       state.filteredProducts = temporaryProducts;
//     },
//     FILTERPRODUCT_BY_BRAND(state, action) {
//       const { products, brand } = action.payload;

//       let temporaryProducts = [];

//       if (brand === "ALL") {
//         temporaryProducts = products;
//       } else {
//         temporaryProducts = products.filter(
//           (product) => product.brand === brand
//         );
//       }
//       state.filteredProducts = temporaryProducts;
//     },
//     FILTERPRODUCT_BY_SEARCH(state, action) {
//       // console.log(action.payload)
//       const { products, search } = action.payload;

//       const temporaryProducts = products.filter(
//         (product) =>
//           product.name.toLowerCase().includes(search.toLowerCase()) ||
//           product.brand.toLowerCase().includes(search.toLowerCase()) ||
//           product.category.toLowerCase().includes(search.toLowerCase())
//       );

//       state.filteredProducts = temporaryProducts;
//     },
//     SORT_PRODUCTS(state, action) {
//       //console.log(action.payload);
//       const { products, sort } = action.payload;

//       let temporaryProducts = [];
//       if (sort === "Latest") {
//         temporaryProducts = products;
//       }
//       if (sort === "Lowest Price") {
//         temporaryProducts = products.slice().sort((a, b) => a.price - b.price);
//       }
//       if (sort === "Highest Price") {
//         temporaryProducts = products.slice().sort((a, b) => b.price - a.price);
//       }
//       state.filteredProducts = temporaryProducts;
//     },

//   },
// })

//     //SLICE F0UR : CARTSLICE
//     const initialCartSlice = {
//       cartItems:[],
//       cartTotalQty : 0,
//       cartTotalAmnt : 0
//     };

//     const cartSlice =  createSlice({
//       name:'cart',
//       initialState:initialCartSlice,
//       reducers:{
//         ADDPRODUCT_TO_STORE(state,action){
//           console.log(action.payload)
//           const newItem= action.payload;
//           const existingItem = state.cartItems.find((item)=>
//            item.id === newItem.id
//           );
//           if(!existingItem){
//              state.cartTotalQty ++;
//               state.cartItems.push({...action.payload,quantity:1})
//               console.log(state.cartItems)
//               console.log(`${action.payload.name} added to cart`);
//           }else{

//             existingItem.quantity = existingItem.quantity + 1
//             console.log(`${action.payload.name} increased by 1`);
//           }
//         },
//         DECREASEPRODUCT_FROM_CART(state,action){
//          // console.log(action.payload)
//          const newItem = action.payload;
//          const existingItem = state.cartItems.find((item)=>item.id===newItem.id);

//          if(existingItem.quantity===1){
//           state.cartItems= state.cartItems.filter((item)=>item.id !==newItem.id)
//           state.cartTotalQty= state.cartTotalQty -1;
//          }else{

//           existingItem.quantity = existingItem.quantity -1
//          }
//         },
//         REMOVEPRODUCT_FROM_CART(state,action){
//           // console.log(action.payload);
//           const product = action.payload;
//           const existingItem = state.cartItems.find((item)=>item.id===product.id);
//           if(existingItem){
//             state.cartItems = state.cartItems.filter((item)=>item.id !==product.id)
//           }

//         }
//       }
//     });

// const store = configureStore({
//   reducer: {
//     auth: authSlice.reducer,
//     products: productsSlice.reducer,
//     filter: filteredSlice.reducer,
//     cart:cartSlice.reducer
//   },
// });

// export const authActions = authSlice.actions;
// export const productsActions = productsSlice.actions;
// export const filterActions = filteredSlice.actions;
// export const cartActions = cartSlice.actions;
// export default store;
