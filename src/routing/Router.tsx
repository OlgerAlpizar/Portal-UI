import { AppLayout } from '../App'
import { FC, Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ForgotPassword from '../components/forgotPassword/ForgotPassword'
import Home from '../components/home/Home'
import Loading from '../shared/components/loading/Loading'
import PrivateRoute from './PrivateRoute'
import SignIn from '../components/signIn/SignIn'
import SignUp from '../components/signUp/SignUp'

const UserManagementRemote = lazy(
  () => import('user_management/UserManagementRemote')
)

const Router: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<AppLayout />}
      >
        <Route
          index
          element={<Home />}
        />
        <Route
          path="sign-in"
          element={<SignIn />}
        />
        <Route
          path="sign-up"
          element={<SignUp />}
        />
        <Route
          path="forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="user/*"
          element={
            <PrivateRoute>
              <Suspense
                fallback={
                  <Loading moduleName={'Loading user management component'} />
                }
              >
                <UserManagementRemote />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  )
}

export default Router
