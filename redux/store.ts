import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from './features/categorySlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      category: categoryReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']