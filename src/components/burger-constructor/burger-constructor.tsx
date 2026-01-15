import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { clearConstructor, selectConstructorItems } from '../../slices/constructorSlice/constructorSlice';
import { clearOrder, fetchNewOrder, selectOrderError, selectOrderModalData, selectOrderRequest } from '../../slices/orderBurgerSlice/orderBurgerSlice';
import { useDispatch } from '../../services/store';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../slices/userSlice/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderError = useSelector(selectOrderError);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuth = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if(isAuth) {
      const newOrder: string[] = [];

      newOrder.push(constructorItems.bun._id);
      constructorItems.ingredients.map((ing) => {
        newOrder.push(ing._id);
      });
      newOrder.push(constructorItems.bun._id);
      

      dispatch(fetchNewOrder(newOrder));
      if(!orderRequest && orderError === '') {
        dispatch(clearConstructor());
      }
    } else {
      navigate('/login');
    }

  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () => 
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
