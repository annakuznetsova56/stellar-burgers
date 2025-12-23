import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Route,
  useLocation,
  useNavigate,
  Routes,
} from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../../../src/utils/protectedRoute';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../slices/ingredientsSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const closeModal = () => {
    navigate(-1);
  }
  
  return (
  <div className={styles.app}>
    <AppHeader />
    
    <Routes location={background || location}>
      <Route path='/' element={<ConstructorPage />} />

      <Route path='/feed'>
        <Route index element={<Feed />} />
        <Route
          path=':number'
          element={
          <div className={styles.detailPageWrap}>
            <h1 className={`${styles.detailHeader} text text_type_main-large`}>Детали заказа</h1>
            <OrderInfo />
          </div>}
        />
      </Route>

      <Route
        path='/login'
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path='/register'
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/reset-password'
        element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        }
      />

      <Route path='/profile'>
        <Route
          index
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='orders/:number'
          element={
            <ProtectedRoute>
                <div className={styles.detailPageWrap}>
                  <h1 className={`${styles.detailHeader} text text_type_main-large`}>Детали заказа</h1>
                  <OrderInfo />
                </div>
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path='/ingredients/:id'
        element={
          <div className={styles.detailPageWrap}>
            <h1 className={`${styles.detailHeader} text text_type_main-large`}>Детали ингредиента</h1>
            <IngredientDetails />
          </div>
        }
      />

      <Route path='*' element={<NotFound404 />} />
    </Routes>

    {background && 
      <Routes>
        <Route path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={closeModal}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route path='/feed/:number'
          element={
            <Modal title='' onClose={closeModal}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route path='/profile/orders/:number'
          element={
            <Modal title='' onClose={closeModal}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    }

  </div>
);
}

export default App;