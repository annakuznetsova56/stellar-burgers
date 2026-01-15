import { forgotPassword, passwordReducer, resetPassword } from "./passwordSlice";

const initialPasswordState = {
    password: 'qwerty123',
    error: '',
    loading: true
};

describe('проверка passwordReducer, async экшена forgotPassword', () => {
    it('при вызове экшена Request loading становится true', () => {
        const requestAction = { type: forgotPassword.pending.type };
        const newState = passwordReducer(initialPasswordState, requestAction);

        expect(newState.loading).toBe(true);
    });

    it('при вызове экшена Success данные записываются в состояние а loading становится false', () => {
        const successAction = { type: forgotPassword.fulfilled.type };
        const newState = passwordReducer(initialPasswordState, successAction);

        expect(newState.loading).toBe(false);
        expect(newState.password).toBe('');
    });

    it('при вызове экшена Failed loading становится false, передается ошибка', () => {
        const failedAction = { type: forgotPassword.rejected.type, error: {message: 'Ошибка сброса пароля'} };
        const newState = passwordReducer(initialPasswordState, failedAction);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка сброса пароля');
    });
})

describe('проверка passwordReducer, async экшена resetPassword', () => {
    it('при вызове экшена Request loading становится true', () => {
        const requestAction = { type: resetPassword.pending.type };
        const newState = passwordReducer(initialPasswordState, requestAction);

        expect(newState.loading).toBe(true);
    });

    it('при вызове экшена Success данные записываются в состояние а loading становится false', () => {
        const successAction = { type: resetPassword.fulfilled.type };
        const newState = passwordReducer(initialPasswordState, successAction);

        expect(newState.loading).toBe(false);
        expect(newState.password).toBe('');
    });

    it('при вызове экшена Failed loading становится false, передается ошибка', () => {
        const failedAction = { type: resetPassword.rejected.type, error: {message: 'Ошибка восстановления пароля'} };
        const newState = passwordReducer(initialPasswordState, failedAction);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка восстановления пароля');
    });
})