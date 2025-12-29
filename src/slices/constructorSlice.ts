import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructorr',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },

    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const { 
  addBun, 
  addIngredient, 
  removeIngredient,
  clearConstructor 
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;

export const selectConstructorItems = (state: { constructorr: TConstructorState }) => 
  state.constructorr;
export const selectConstructorBun = (state: { constructorr: TConstructorState }) => 
  state.constructorr.bun;
export const selectConstructorIngredients = (state: { constructorr: TConstructorState }) => 
  state.constructorr.ingredients;



