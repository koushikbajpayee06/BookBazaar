import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
  },

  reducers: {
    addItem: (state, action) => {
      const newBook = action.payload;

      const existingBook = state.items.find(
        (book) => book.id === newBook.id
      );

      if (existingBook) {
        existingBook.quantity += 1;
      } else {
        state.items.push({
          ...newBook,
          quantity: 1,
        });
      }
    },

    increaseQuantity: (state, action) => {
      const book = state.items.find(
        (item) => item.id === action.payload
      );

      if (book) {
        book.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const book = state.items.find(
        (item) => item.id === action.payload
      );

      if (!book) return;

      if (book.quantity > 1) {
        book.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (book) => book.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;