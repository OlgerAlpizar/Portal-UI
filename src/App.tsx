import React, { FC, lazy } from 'react';
import AppCustomContextProvider from './contexts/AppCustomContext';
import Footer from './components/footer/Footer';
import { Container, Row, Col } from 'react-bootstrap';

const LoginRemote = lazy(() => import('login/LoginRemote'))

const App: FC = () => {
  return (
    <AppCustomContextProvider>
      <Container>
        <Row>
          <Col>
          <React.Suspense fallback={'Loading Login component'}>
          <LoginRemote/>
          </React.Suspense>
          </Col>
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
