import { fetchOrderByNumber, orderSearchReducer } from "./orderSearchSlice";

describe('проверка orderSearchReducer', () => {
    const initialSearchState = {
        orders: [],
        loading: false,
        error: null
    };

    it('при вызове экшена Request loading становится true', () => {
        const requestAction = { type: fetchOrderByNumber.pending.type };
        const newState = orderSearchReducer(initialSearchState, requestAction);

        expect(newState.loading).toBe(true);
    });

    it('при вызове экшена Success данные записываются в состояние а loading становится false', () => {
        const expectedResult = {
            orders: [{
            "ingredients": [],
            "_id": "1234567890",
            "owner": {
                "name": "User",
                "email": "user@mail.ru",
                "createdAt": "2025-12-28T15:17:14.050Z",
                "updatedAt": "2025-12-29T17:36:20.604Z"
            },
            "status": "done",
            "name": "Spicy краторный бургер",
            "createdAt": "2026-01-13T18:56:48.750Z",
            "updatedAt": "2026-01-13T18:56:48.942Z",
            "number": 888,
            "price": 2600
        }]}
        const successAction = { type: fetchOrderByNumber.fulfilled.type, payload: expectedResult };
        const newState = orderSearchReducer(initialSearchState, successAction);

        expect(newState.loading).toBe(false);
        expect(newState.orders).toBe(expectedResult.orders);
    });

    it('при вызове экшена Failed loading становится false, передается ошибка', () => {
        const failedAction = { type: fetchOrderByNumber.rejected.type, error: {message: 'Ошибка загрузки поиска'} };
        const newState = orderSearchReducer(initialSearchState, failedAction);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка загрузки поиска');
    });
})