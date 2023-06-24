import { BrowserRouter } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { FC, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import AppCustomContextProvider from './contexts/AppCustomContext'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Home from './components/home/Home'
import PubSub from 'pubsub-js';
import PubSubTopic from './models/PubSubTopic'
import React from 'react'
import style from './app.module.scss'

const AuthenticationRemote = React.lazy(() => import('authentication/AuthenticationRemote'))
const UserManagementRemote = React.lazy(() => import('user_management/UserManagementRemote'))

const App: FC = () => {
  useEffect(() => {
    PubSub.subscribe(PubSubTopic[PubSubTopic.SIGN_IN], subscribeMethod)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscribeMethod = (topic: string, data: any) => {
    toast.success(`Intercept ${topic} for the user: ${data.email}`)
  }

  return (
    <AppCustomContextProvider>
      <BrowserRouter>
        <Container className={style.mainContainer}>
          <Row>
            <Header />
          </Row>

          <Row className={style.rowBody}>
            <Routes>
              <Route
                index
                element={
                  <Home />
                }
              />
              <Route
                path="/authentication/*"
                element={
                  <Suspense fallback='Loading authentication'>
                    <AuthenticationRemote />
                  </Suspense>
                }
              />
              <Route
                path="/user/*"
                element={
                  <Suspense fallback='Loading user'>
                    <UserManagementRemote />
                  </Suspense>
                }
              />
            </Routes>
          </Row>

          <Row>
            <Col>
              <Footer />
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
      <ToastContainer
        autoClose={5000}
        position={toast.POSITION.BOTTOM_RIGHT}
        pauseOnFocusLoss={false}
        newestOnTop={true}
        limit={5}
      />
    </AppCustomContextProvider>
  )
}

export default App
