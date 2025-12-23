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
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../../../src/utils/protectedRoute';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../slices/ingredientsSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  
  return (
  <div className={styles.app}>
    <AppHeader />
    <Outlet />
  </div>
);
}

// const TestPage = () => (
//   <div style={{ color: 'red', fontSize: '24px' }}>
//     Test Page - Routing Works!
//   </div>
// );

// const closeModal = () => {
//   navigate(-1);
// }

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<ConstructorPage />} />

      <Route path='feed'>
        <Route index element={<Feed />} />
        <Route
          path=':number'
          element={
            <Modal title='' onClose={() => window.history.back()}>
              <OrderInfo />
            </Modal>
          }
        />
      </Route>

      <Route
        path='login'
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path='register'
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path='forgot-password'
        element={
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='reset-password'
        element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        }
      />

      <Route path='profile'>
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
              <Modal title='' onClose={() => window.history.back()}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path='ingredients/:id'
        element={
          <Modal title='Детали ингредиента' onClose={() => window.history.back()}>
            <IngredientDetails />
          </Modal>
        }
      />

      <Route path='*' element={<NotFound404 />} />
    </Route>
  )
);

export default App;