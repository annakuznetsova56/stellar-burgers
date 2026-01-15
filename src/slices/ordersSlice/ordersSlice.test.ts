import { fetchOrders, ordersReducer } from "./ordersSlice";

describe('проверка ordersReducer', () => {
    it('при вызове экшена Request loading становится true', () => {
        const initialOrdersState = {
            orders: [],
            loading: false,
            error: null
        };
        const requestAction = { type: fetchOrders.pending.type };
        const newState = ordersReducer(initialOrdersState, requestAction);

        expect(newState.loading).toBe(true);
    });

    it('при вызове экшена Success данные записываются в состояние а loading становится false', () => {
        const initialOrdersState = {
            orders: [],
            loading: false,
            error: null
        };
        const mockPayload = [{
            "name": "Spicy краторный бургер",
            "order": {
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
            }
        }]
        const successAction = { type: fetchOrders.fulfilled.type, payload: mockPayload };
        const newState = ordersReducer(initialOrdersState, successAction);

        expect(newState.loading).toBe(false);
        expect(newState.orders).toBe(mockPayload);
    });

    it('при вызове экшена Failed loading становится false, передается ошибка', () => {
        const initialOrdersState = {
            orders: [],
            loading: false,
            error: null
        };
        const failedAction = { type: fetchOrders.rejected.type, error: {message: 'Ошибка загрузки заказов'} };
        const newState = ordersReducer(initialOrdersState, failedAction);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка загрузки заказов');
    });
})