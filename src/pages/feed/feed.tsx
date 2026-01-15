import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed, selectFeedLoading, selectFeedOrders } from '../../slices/feedSlice/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const loading = useSelector(selectFeedLoading);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  useEffect(() => {
    if ((!orders || orders.length === 0) && !loading) {
      dispatch(fetchFeed());
    }
  }, [dispatch, orders.length, loading]);

  if (loading && orders.length === 0) {
    return <Preloader />;
  }

  if (!orders || orders.length === 0) {
    return <div>Нет заказов</div>;
  }
 
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
