import { fetchUser, loginUser, selectIsAuthChecked, selectUser, selectUserRequest } from '../slices/userSlice';
import { useDispatch, useSelector } from '../services/store';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getCookie } from './cookie';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyAuth: boolean;
};

export const ProtectedRoute = ({ children, onlyAuth }: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserRequest);

  useEffect(() => {
    if (!isAuthChecked && !loading) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthChecked, loading]);

  if (!isAuthChecked || loading) {
    return <Preloader />;
  }

  if (!user && onlyAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (user && !onlyAuth) {
    return <Navigate replace to='/'/>;
  }

    return children ;
}

