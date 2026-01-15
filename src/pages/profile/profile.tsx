import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUser, updateUser } from '../../slices/userSlice/userSlice';
import { Navigate } from 'react-router-dom';
import { selectPassword, setNewPassword } from '../../slices/passwordSlice/passwordSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const password = useSelector(selectPassword);

  if(!user) {
    return <Navigate replace to='/login'/>;
  }

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: password
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || '',
      password: password
    }));
  }, [user]);

  useEffect(() => {
  
  }, [dispatch]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    formValue.password !== password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if(formValue.name !== user?.name ||
    formValue.email !== user?.email) {
      const newValue = {
      name: formValue.name,
      email: formValue.email
    }
    dispatch(updateUser(newValue));
    }

    if(!!formValue.password) {
      dispatch(setNewPassword(formValue.password));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
