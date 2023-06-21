import { FC, Suspense } from 'react';
import AppCustomContextProvider from './contexts/AppCustomContext';
import Footer from './components/footer/Footer';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import AuthenticationRemote from 'authentication/AuthenticationRemote';
import UserManagementRemote from 'user_management/UserManagementRemote';

const App: FC = () => {
  return (
    <AppCustomContextProvider>
      <Container>
        <Row>
          <>Header</>
        </Row>

        <Row>

          <Routes>
            <Route
              path="/authentication"
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
    </AppCustomContextProvider>
  )
}

export default App;
