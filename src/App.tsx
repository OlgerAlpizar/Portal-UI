import { BrowserRouter } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { FC, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AppCustomContextProvider from './contexts/AppCustomContext'
import AuthenticationRemote from 'authentication/AuthenticationRemote'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Home from './components/home/Home'
import UserManagementRemote from 'user_management/UserManagementRemote'
import style from './app.module.scss'

const App: FC = () => {
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
                <Home/>
              }
              />
              <Route
                path="/authentication/*"
                element={
                  <Suspense>
                    <AuthenticationRemote />
                  </Suspense>
                }
              />
              <Route
                path="/user/*"
                element={
                  <Suspense>
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
    </AppCustomContextProvider>
  )
}

export default App
