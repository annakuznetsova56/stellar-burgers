import { fetchNewOrder, orderBurgerReducer } from "./orderBurgerSlice"

describe('проверка orderBurgerReducer', () => {
    it('при вызове экшена Request loading становится true', () => {
        const initialBurgerState = {
            name: '',
            burger: null,
            loading: false,
            error: ''
        };
        const requestAction = { type: fetchNewOrder.pending.type };
        const newState = orderBurgerReducer(initialBurgerState, requestAction);

        expect(newState.loading).toBe(true);
    });

    it('при вызове экшена Success данные записываются в состояние а loading становится false', () => {
        const initialBurgerState = {
            name: '',
            burger: null,
            loading: true,
            error: ''
        };
        const mockPayload = {
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
        }
        const successAction = { type: fetchNewOrder.fulfilled.type, payload: mockPayload };
        const newState = orderBurgerReducer(initialBurgerState, successAction);

        expect(newState.loading).toBe(false);
        expect(newState.burger).toBe(mockPayload.order);
        expect(newState.name).toBe(mockPayload.name);
    });

    it('при вызове экшена Failed loading становится false, передается ошибка', () => {
        const initialBurgerState = {
            name: '',
            burger: null,
            loading: true,
            error: ''
        };
        const failedAction = { type: fetchNewOrder.rejected.type, error: {message: 'Ошибка загрузки заказа'} };
        const newState = orderBurgerReducer(initialBurgerState, failedAction);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка загрузки заказа');
    });
})