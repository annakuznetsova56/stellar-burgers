import { fetchUser, loginUser, logoutUser, registerUser, updateUser, userReducer } from "./userSlice";

const initialUserState = {
        isAuthChecked: false, 
        isAuthenticated: false,
        user: null,
        error: '',
        loading: false,
}; 

const initialIsUserState = {
    ...initialUserState,
    user: {
        email: 'oldUser@mail.ru',
        name: 'oldUser'
    }
}

const mockUser = {
    refreshToken: '123',
    accessToken: '123',
    user: {
        email: 'user@mail.ru',
        name: 'User'
    }
}

describe('проверка userReducer, async экшн loginUser', () => {
    it('при вызове экшена Request loading становится true', () => {
        const requestAction = { type: loginUser.pending.type };
        const newState = userReducer(initialUserState, requestAction);

        expect(newState.loading).toBe(true);
    });

    it('при вызове экшена Success данные записываются в состояние а loading становится false', () => {
        const successAction = { type: loginUser.fulfilled.type, payload: mockUser };
        const newState = userReducer(initialUserState, successAction);

        expect(newState.loading).toBe(false);
        expect(newState.user).toBe(mockUser.user);
        expect(newState.isAuthChecked).toBe(true);
        expect(newState.isAuthenticated).toBe(true);
    });

    it('при вызове экшена Failed loading становится false, передается ошибка', () => {
        const failedAction = { type: loginUser.rejected.type, error: {message: 'Ошибка входа'} };
        const newState = userReducer(initialUserState, failedAction);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка входа');
        expect(newState.isAuthChecked).toBe(true);
        expect(newState.isAuthenticated).toBe(false);
    });
});

describe('проверка userReducer, async экшн registerUser', () => {
    it('при вызове экшена Request loading становится true', () => {
        const requestAction = { type: registerUser.pending.type };
        const newState = userReducer(initialUserState, requestAction);

        expect(newState.loading).toBe(true);
    });

    it('при вызове экшена Success данные записываются в состояние а loading становится false', () => {
        const successAction = { type: registerUser.fulfilled.type, payload: mockUser };
        const newState = userReducer(initialUserState, successAction);

        expect(newState.loading).toBe(false);
        expect(newState.user).toBe(mockUser.user);
        expect(newState.isAuthChecked).toBe(true);
        expect(newState.isAuthenticated).toBe(true);
    });

    it('при вызове экшена Failed loading становится false, передается ошибка', () => {
        const failedAction = { type: registerUser.rejected.type, error: {message: 'Ошибка регистрации'} };
        const newState = userReducer(initialUserState, failedAction);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка регистрации');
        expect(newState.isAuthChecked).toBe(true);
        expect(newState.isAuthenticated).toBe(false);
    });
})

describe('проверка userReducer, async экшн fetchUser', () => {
    it('при вызове экшена Request loading становится true', () => {
        const requestAction = { type: fetchUser.pending.type };
        const newState = userReducer(initialUserState, requestAction);

        expect(newState.loading).toBe(true);
    });

    it('при вызове экшена Success данные записываются в состояние а loading становится false', () => {
        const successAction = { type: fetchUser.fulfilled.type, payload: mockUser };
        const newState = userReducer(initialUserState, successAction);

        expect(newState.loading).toBe(false);
        expect(newState.user).toBe(mockUser.user);
        expect(newState.isAuthChecked).toBe(true);
        expect(newState.isAuthenticated).toBe(true);
    });

    it('при вызове экшена Failed loading становится false, передается ошибка', () => {
        const failedAction = { type: fetchUser.rejected.type, error: {message: 'Ошибка проверки пользователя'} };
        const newState = userReducer(initialUserState, failedAction);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка проверки пользователя');
        expect(newState.isAuthChecked).toBe(true);
        expect(newState.isAuthenticated).toBe(false);
    });
})

describe('проверка userReducer, async экшн updateUser', () => {
    it('при вызове экшена Request loading становится true', () => {
        const requestAction = { type: updateUser.pending.type };
        const newState = userReducer(initialIsUserState, requestAction);

        expect(newState.loading).toBe(true);
    });

    it('при вызове экшена Success данные записываются в состояние а loading становится false', () => {
        const successAction = { type: updateUser.fulfilled.type, payload: mockUser };
        const newState = userReducer(initialIsUserState, successAction);

        expect(newState.loading).toBe(false);
        expect(newState.user).toBe(mockUser.user);
        expect(newState.isAuthChecked).toBe(true);
        expect(newState.isAuthenticated).toBe(true);
    });

    it('при вызове экшена Failed loading становится false, передается ошибка', () => {
        const failedAction = { type: updateUser.rejected.type, error: {message: 'Ошибка изменения данных'} };
        const newState = userReducer(initialIsUserState, failedAction);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка изменения данных');
        expect(newState.isAuthChecked).toBe(true);
        expect(newState.isAuthenticated).toBe(true);
    });
})

describe('проверка userReducer, async экшн logoutUser', () => {
    it('при вызове экшена Request loading становится true', () => {
        const requestAction = { type: logoutUser.pending.type };
        const newState = userReducer(initialIsUserState, requestAction);

        expect(newState.loading).toBe(true);
    });

    it('при вызове экшена Success данные записываются в состояние а loading становится false', () => {
        const mockPayload = {
            success: true,
            user: null
        }
        const successAction = { type: logoutUser.fulfilled.type, payload: mockPayload };
        const newState = userReducer(initialIsUserState, successAction);

        expect(newState.loading).toBe(false);
        expect(newState.user).toBe(null);
        expect(newState.isAuthChecked).toBe(true);
        expect(newState.isAuthenticated).toBe(false);
    });

    it('при вызове экшена Failed loading становится false, передается ошибка', () => {
        const failedAction = { type: logoutUser.rejected.type, error: {message: 'Ошибка выхода'} };
        const newState = userReducer(initialIsUserState, failedAction);

        expect(newState.loading).toBe(false);
        expect(newState.error).toBe('Ошибка выхода');
        expect(newState.isAuthChecked).toBe(true);
        expect(newState.isAuthenticated).toBe(true);
    });
})