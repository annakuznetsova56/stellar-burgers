import { fetchIngredients, ingredientsReducer } from "./ingredientsSlice";

describe('проверка ingredientsReducer', () => {
    const initialIngredientsState = {
        ingredients: [],
        buns: [],
        mains: [],
        sauces: [],
        currentIngredient: null,
        loading: false,
        error: null
    };

    it('при вызове экшена Request loading становится true', () => {
        const requestAction = { type: fetchIngredients.pending.type };
        const newState = ingredientsReducer(initialIngredientsState, requestAction);

        expect(newState.loading).toBe(true);
    });

    it('при вызове экшена Success данные записываются в состояние а loading становится false', () => {
        const mockPayload = [{
            "_id": "643d69a5c3f7b9001cfa0942",
            "name": "Соус Spicy-X",
            "type": "sauce",
            "proteins": 30,
            "fat": 20,
            "carbohydrates": 40,
            "calories": 30,
            "price": 90,
            "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        },
        {
            "_id": "643d69a5c3f7b9001cfa0943",
            "name": "Соус фирменный Space Sauce",
            "type": "sauce",
            "proteins": 50,
            "fat": 22,
            "carbohydrates": 11,
            "calories": 14,
            "price": 80,
            "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        }]
        const successAction = { type: fetchIngredients.fulfilled.type, payload: mockPayload };
        const newState = ingredientsReducer(initialIngredientsState, successAction);

        expect(newState.loading).toBe(false);
        expect(newState.ingredients).toBe(mockPayload);
    });

    it('при вызове экшена Failed loading становится false, передается ошибка', () => {
        const failedAction = { type: fetchIngredients.rejected.type, error: {message: 'Ошибка загрузки ингредиентов'} };
        const newState = ingredientsReducer(initialIngredientsState, failedAction);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка загрузки ингредиентов');
    });
})