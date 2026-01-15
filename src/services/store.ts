import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from '../slices/ingredientsSlice/ingredientsSlice';
import { feedReducer } from '../slices/feedSlice/feedSlice';
import { ordersReducer } from '../slices/ordersSlice/ordersSlice';
import { orderBurgerReducer } from '../slices/orderBurgerSlice/orderBurgerSlice';
import { orderSearchReducer } from '../slices/orderSearchSlice/orderSearchSlice';
import { constructorReducer } from '../slices/constructorSlice/constructorSlice';
import { userReducer } from '../slices/userSlice/userSlice';
import { passwordReducer } from '../slices/passwordSlice/passwordSlice';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    feed: feedReducer,
    orders: ordersReducer,
    order: orderBurgerReducer,
    orderSearch: orderSearchReducer,
    constructorr: constructorReducer,
    user: userReducer,
    password: passwordReducer
});


const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});


export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
