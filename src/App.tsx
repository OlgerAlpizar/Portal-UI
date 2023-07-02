
import { Col, Container, Row } from 'react-bootstrap'
import { FC, useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { PortalContext } from './contexts/PortalContext'
import { useNavigate } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import PubSub from 'pubsub-js'
import PubSubTopic from './models/PubSubTopic'
import Router from './routing/Router'
import style from './app.module.scss'

const App: FC = () => {
  const ctx = useContext(PortalContext)
  const navigate = useNavigate();

  useEffect(() => {
    PubSub.subscribe(PubSubTopic[PubSubTopic.SIGN_IN], subscribeMethod)
  }, [])

  const subscribeMethod = () => {
    ctx?.setIsAuthenticated(true)
    navigate('/')
  }

  return (
    <Container className={style.mainContainer}>
      <Row>
        <Col>
        <Header />
        </Col>
      </Row>

      <Row className={style.rowBody}>
        <Col>
        <Router/>
        </Col>
      </Row>

      <Row>
        <Col>
        <Footer />
        </Col>
      </Row>
    </Container>
  )
}

export const AppLayout: FC = () => {
  return (
    <Outlet/>
  )
}

export default App
