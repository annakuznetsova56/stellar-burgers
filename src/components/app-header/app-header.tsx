import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectIsAuthenticated, selectUser } from '../../slices/userSlice/userSlice';

export const AppHeader: FC = () => {
    const isAuth = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    let userName = '';

    if(isAuth && user) {
        userName = user.name;
    }

    return (
        <AppHeaderUI userName={userName} />
    );
}

