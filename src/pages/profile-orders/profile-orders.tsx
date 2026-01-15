import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders, selectOrders, selectOrdersLoading } from '../../slices/ordersSlice/ordersSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const loading = useSelector(selectOrdersLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!loading) {
      dispatch(fetchOrders());
    }
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
