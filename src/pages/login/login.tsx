import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { loginUser, selectUserError, updateUser } from '../../slices/userSlice';
import { TLoginData } from '@api';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const error = useSelector(selectUserError);
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

     const userData: TLoginData = {
          email: email,
          password: password
        }
    
        dispatch(loginUser(userData));
        navigate(from, { replace: true });
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
