
import { AppLayout } from '../App';
import { FC, Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../components/home/Home'
import Loading from '../shared/components/Loading';
import PrivateRoute from './PrivateRoute';

const AuthenticationRemote = lazy(() => import('authentication/AuthenticationRemote'))
const UserManagementRemote = lazy(() => import('user_management/UserManagementRemote'))

const Router: FC = () => {
  return (
    <Routes>

      <Route path='/' element={<AppLayout />}>
        <Route
          index
          element={
            <Home />
          }
        />
        <Route
          path="auth/*"
          element={
            <Suspense fallback={<Loading moduleName={'Loading authentication component'} />}>
              <AuthenticationRemote />
            </Suspense>
          }
        />
        <Route
          path="user/*"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loading moduleName={'Loading user management component'} />}>
                <UserManagementRemote />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default Router