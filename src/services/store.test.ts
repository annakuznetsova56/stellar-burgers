import store, { rootReducer, RootState } from "./store"

describe('проверка инициализации rootReducer', () => {
    const initialState: RootState = {
        ingredients: {ingredients: [], buns: [], mains: [], sauces: [], currentIngredient: null, loading: false, error: ''},
        feed: {orders: [], total: 0, totalToday: 0, loading: false, error: ''},
        orders: {orders: [], loading: false, error: ''},
        order: {name: '', burger: null, loading: false, error: ''},
        orderSearch: {orders: [], loading: false, error: ''},
        constructorr: {bun: null, ingredients: []},
        user: {isAuthChecked: false, isAuthenticated: false, user: null, loading: false, error: ''},
        password: {password: '', loading: false, error: ''}
    }

    it('должен возвращать корректное начальное состояние при вызове с неизвестным экшеном', () => {
        expect(store).toBeDefined();
        const result = rootReducer(initialState, { type: 'UNKNOWN_ACTION' })
    
    
        expect(result).toEqual(initialState);
    })
})