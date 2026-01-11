import { FC, memo, useEffect } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI, Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../slices/ingredientsSlice';
import { useDispatch } from '../../services/store';
import { fetchOrders } from '../../slices/ordersSlice';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const ingredients = useSelector(selectIngredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  if(!orders || !ingredients) {
    return <Preloader />
  }

  if(orders.length === 0) {
    return <h1 className='text text_type_main-medium'>Нет заказов</h1>
  }

  return <OrdersListUI orderByDate={orderByDate} />;
});
