import { feedReducer, fetchFeed } from "./feedSlice";

describe('проверка feedReducer', () => {
    const initialFeedState = {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
    };

    it('при вызове экшена Request loading становится true', () => {
        const requestAction = { type: fetchFeed.pending.type };
        const newState = feedReducer(initialFeedState, requestAction);

        expect(newState.loading).toBe(true);
    });

    it('при вызове экшена Success данные записываются в состояние а loading становится false', () => {
        const mockPayload = {
            "orders": [{
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
            }],
            "total": 100,
            "totalToday": 50
        }
        const successAction = { type: fetchFeed.fulfilled.type, payload: mockPayload };
        const newState = feedReducer(initialFeedState, successAction);

        expect(newState.loading).toBe(false);
        expect(newState.orders).toBe(mockPayload.orders);
        expect(newState.total).toBe(mockPayload.total);
        expect(newState.totalToday).toBe(mockPayload.totalToday);
    });

    it('при вызове экшена Failed loading становится false, передается ошибка', () => {
        const failedAction = { type: fetchFeed.rejected.type, error: {message: 'Ошибка загрузки ленты'} };
        const newState = feedReducer(initialFeedState, failedAction);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка загрузки ленты');
    });
})