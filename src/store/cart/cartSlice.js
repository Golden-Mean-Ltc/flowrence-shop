import { createSlice } from "@reduxjs/toolkit";
import fakeApi from "../../_api/fakeApi";

const initialState = {
  // Get cart items from local storage
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    itemAdded: {
      // * action.type : cart/itemAdded
      reducer(state, action) {
        // * Check if item already exist
        const existItem = state.cartItems.find(
          (item) => item.asin === action.payload.asin
        );
        // if not existed, add item
        if (!existItem) {
          state.cartItems.push(action.payload);
        } else {
          // If item already exist, replace to update quantity
          const index = state.cartItems.findIndex(
            (item) => item.asin === action.payload.asin
          );
          state.cartItems[index] = action.payload;
        }
      },
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.asin !== action.payload
      ); 
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cartItems.find((item) => item.asin === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cartItems.find((item) => item.asin === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.removeItem(state, action);
    },
    // * remove all items in cart
    reset: {
      // eslint-disable-next-line no-unused-vars
      reducer(state, action) {
        state.cartItems = [];
      },
    },
    shippingAddressSaved: {
      reducer(state, action) {
        state.shippingAddress = action.payload;
      },
    },
    paymentMethodSaved: {
      reducer(state, action) {
        state.paymentMethod = action.payload;
      },
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: (state) => (state = initialState),
  }
},
);

// * ACTIONS
//-------------------------------
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  // const { data } = await axios.get(`/api/products/${id}`)
  const { data } = await fakeApi(`/products/id`, id);
  console.log(data);

  dispatch({
    // type: "CART_ADD_ITEM",
    type: "cart/itemAdded",
    payload: {
      ...data,
      product: data.asin,
      // countInStock: data.countInStock,
      quantity: quantity ? quantity : 1,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: "cart/removeItem",
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    // type: 'CART_SAVE_SHIPPING_ADDRESS',
    type: "cart/shippingAddressSaved",
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: "cart/paymentMethodSaved",
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

// remove all cart items
export const resetCart = (dispatch) => {
  dispatch({
    type: "cart/reset",
  });

  localStorage.removeItem("cartItems");
};


// # Selector for cart detials
export const selectCartTotalItems = (cart) => {
  return cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)
}


export const selectCartTotalPrice = (cart) => {
  return cart.cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2)
}

export const {
  itemAdded,
  removeItem,
  clearCartItems,
  increaseItemQuantity,
  decreaseItemQuantity
} = cartSlice.actions;

export default cartSlice.reducer;
