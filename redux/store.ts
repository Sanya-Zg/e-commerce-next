import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from './features/categorySlice';
import cartReducer from './features/cartSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      category: categoryReducer,
      cart: cartReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']