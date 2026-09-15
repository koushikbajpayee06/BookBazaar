import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
const savedCartItems =
  JSON.parse(localStorage.getItem("cartItems")) || [];
const appStore = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    },
     preloadedState: {
    cart: {
      items: savedCartItems,
    },
  },
})
appStore.subscribe(() => {
  const cartItems =
    appStore.getState().cart.items;

  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
  );
});
export default appStore