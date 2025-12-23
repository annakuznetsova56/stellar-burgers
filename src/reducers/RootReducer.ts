import { combineReducers } from "@reduxjs/toolkit"
import { ingredientsReducer } from "../slices/ingredientsSlice"
import { feedReducer } from "../slices/feedSlice";
import { orderBurgerReducer } from "../slices/orderBurgerSlice";
import { orderSearchReducer } from "../slices/orderSearchSlice";
import { ordersReducer } from "../slices/ordersSlice";
import { constructorReducer } from "../slices/constructorStandAlone";

// RootReducer.ts - добавьте это ПЕРЕД export
console.log('=== ROOT REDUCER DEBUG ===');
console.log('🔍 constructorReducer imported:', constructorReducer);
console.log('🔍 constructorReducer type:', typeof constructorReducer);
console.log('🔍 constructorReducer is function?', typeof constructorReducer === 'function');
console.log('🔍 constructorReducer (first 100 chars):', constructorReducer.toString().substring(0, 100));

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    feed: feedReducer,
    orders: ordersReducer,
    order: orderBurgerReducer,
    orderSearch: orderSearchReducer,
    constructor: constructorReducer, // ← что здесь?
});

console.log('🔍 Final rootReducer.constructor:', rootReducer.constructor);
console.log('🔍 Final rootReducer.constructor type:', typeof rootReducer.constructor);

export { rootReducer };