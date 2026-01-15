import { TConstructorIngredient } from "@utils-types";
import { addBun, addIngredient, constructorReducer, removeIngredient } from "./constructorSlice";

describe('проверка constructorReducer', () => {
    const initialConstructorState = {
        bun: null,
        ingredients: [
            {
            "_id": "643d69a5c3f7b9001cfa0941",
            "name": "Биокотлета из марсианской Магнолии",
            "type": "main",
            "proteins": 420,
            "fat": 142,
            "carbohydrates": 242,
            "calories": 4242,
            "price": 424,
            "image": "https://code.s3.yandex.net/react/code/meat-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
            "id": "12345"
        },
        {
            "_id": "643d69a5c3f7b9001cfa093e",
            "name": "Филе Люминесцентного тетраодонтимформа",
            "type": "main",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/meat-03.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
            "id": "123456"
        },
        {
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
            "id": "1234567"
        }
        ]
    }

    const newRemovedIngredients = [
            {
            "_id": "643d69a5c3f7b9001cfa0941",
            "name": "Биокотлета из марсианской Магнолии",
            "type": "main",
            "proteins": 420,
            "fat": 142,
            "carbohydrates": 242,
            "calories": 4242,
            "price": 424,
            "image": "https://code.s3.yandex.net/react/code/meat-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
            "id": "12345"
        },
        {
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
            "id": "1234567"
        }
    ]

    const newBun = {
        "_id": "643d69a5c3f7b9001cfa093c",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "id": "1234567890"
    }

    const newIngredient = {
        "_id": "643d69a5c3f7b9001cfa093f",
        "name": "Мясо бессмертных моллюсков Protostomia",
        "type": "main",
        "proteins": 433,
        "fat": 244,
        "carbohydrates": 33,
        "calories": 420,
        "price": 1337,
        "image": "https://code.s3.yandex.net/react/code/meat-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
        "id": "12345678"
    }

    const newAddedIngredients = [
        ...initialConstructorState.ingredients,
        newIngredient
    ]

    it('добавляется ингредиент после обработки экшена addIngredient', () => {
        const newState = constructorReducer(initialConstructorState, addIngredient(newIngredient));

        const { ingredients } = newState;

        expect(ingredients).toEqual(newAddedIngredients);
    });

    it('добавляется булка после обработки экшена addBun', () => {
        const newState = constructorReducer(initialConstructorState, addBun(newBun));

        const { bun } = newState;

        expect(bun).toEqual(newBun);
    });

    it('удаляется ингредиент после обработки экшена removeIngredient', () => {
        const newState = constructorReducer(initialConstructorState, removeIngredient("123456"));
        const { ingredients } = newState;

        expect(ingredients).toEqual(newRemovedIngredients);
    });

})
