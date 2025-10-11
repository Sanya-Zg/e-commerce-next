import { Product } from '@/sanity.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  favoriteProduct: Product[];
}

const initialState: CartState = {
  items: [],
  favoriteProduct: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    // add item to cart or increase quantity if it exists
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (el) => el.product._id === item._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: item, quantity: 1 });
      }
    },

    // remove item from cart
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const itemId = action.payload;
      state.items = state.items.filter(
        (item) => item.product._id !== itemId._id
      );
    },

    // decrease quantity
    decreaseQuantity: (
      state,
      { payload: productId }: PayloadAction<string>
    ) => {
      const existingItem = state.items.find(
        (el) => el.product._id === productId
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.product._id !== productId
          );
        }
      }
    },

    // clear cart
    clearCart: (state) => {
      state.items = [];
    },

    // add to favorite
    addToFavorite: (state, action: PayloadAction<Product>) => {
      const isFavorite = state.favoriteProduct.some(
        (item) => item._id === action.payload._id
      );
      state.favoriteProduct = isFavorite
        ? state.favoriteProduct.filter(
            (item) => item._id !== action.payload._id
          )
        : [...state.favoriteProduct, action.payload];
    },

    // remove from favorite
    removeFromFavorite: (
      state,
      { payload: productId }: PayloadAction<string>
    ) => {
      state.favoriteProduct = state.favoriteProduct.filter(
        (item) => item._id !== productId
      );
    },

    // reset favorite
    resetFavorite: (state) => {
      state.favoriteProduct = [];
    },
  },
});

// SELECTORS

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

// total price
export const selectTotalPrice = (state: { cart: CartState }) => {
  return state.cart.items.reduce(
    (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
    0
  );
};

// quantity of a specific product
export const selectItemCount = (
  state: { cart: CartState },
  productId: string
) => {
  const item = state.cart.items.find((item) => item.product._id === productId);
  return item ? item.quantity : 0;
};

// price with discount
export const selectSubTotalPrice = (state: { cart: CartState }) => {
  return state.cart.items.reduce((total, item) => {
    const price = item.product.price ?? 0;
    const discountedPrice = price * (1 - (item.product.discount ?? 0) / 100);
    return total + discountedPrice * item.quantity;
  }, 0);
};

// total discount
export const selectTotalDiscount = (state: { cart: CartState }) => {
  return state.cart.items.reduce((totalDiscount, item) => {
    const price = item.product.price ?? 0;
    const discountRate = item.product.discount ?? 0;
    const discount = (discountRate * price) / 100;
    return totalDiscount + discount * item.quantity;
  }, 0);
};

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
  addToFavorite,
  removeFromFavorite,
  resetFavorite,
} = cartSlice.actions;
export default cartSlice.reducer;
