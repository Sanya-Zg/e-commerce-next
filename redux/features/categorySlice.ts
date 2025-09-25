import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface categoryType {
  categoryValue: string;
}

const initialState: categoryType = {
  categoryValue: 'all',
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.categoryValue = action.payload;
    }
  }
})

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
