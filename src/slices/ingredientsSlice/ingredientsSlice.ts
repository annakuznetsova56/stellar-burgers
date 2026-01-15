import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  currentIngredient: TIngredient | null;
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  currentIngredient: null,
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => {
    const response = await getIngredientsApi();
    return response; 
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredientById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const currentIngredient = state.ingredients.find(item => item._id === id);
      currentIngredient ? state.currentIngredient = currentIngredient : state.currentIngredient = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        
        state.buns = action.payload.filter((item: TIngredient) => item.type === 'bun');
        state.mains = action.payload.filter((item: TIngredient) => item.type === 'main');
        state.sauces = action.payload.filter((item: TIngredient) => item.type === 'sauce');
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
      });
  }
});

export const { getIngredientById } = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;


export const selectIngredients = (state: { ingredients: TIngredientsState }) => 
    state.ingredients.ingredients;

export const selectBuns = (state: { ingredients: TIngredientsState }) => 
  state.ingredients.buns;
export const selectMains = (state: { ingredients: TIngredientsState }) => 
  state.ingredients.mains;
export const selectSauces = (state: { ingredients: TIngredientsState }) => 
  state.ingredients.sauces;
export const selectCurrentIngredient = (state: { ingredients: TIngredientsState }) => 
  state.ingredients.currentIngredient;
export const selectIngredientsLoading = (state: { ingredients: TIngredientsState }) => 
  state.ingredients.loading;
export const selectIngredientsError = (state: { ingredients: TIngredientsState }) => 
  state.ingredients.error;