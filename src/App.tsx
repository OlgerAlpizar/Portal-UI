
import { Container, Row } from 'react-bootstrap'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Router from './routing/Router'
import style from './app.module.scss'

const App: FC = () => {
  return (
    <Container className={style.mainContainer}>
      <Row>
        <Header />
      </Row>

      <Row className={style.rowBody}>
        <Router/>
      </Row>

      <Row>
        <Footer />
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
