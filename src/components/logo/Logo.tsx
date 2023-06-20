import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import coffeeCup from '../../../assets/images/coffee_cup.png'
import style from './Logo.module.scss'
import cx from 'classnames'
import Footer from '../footer/Footer'

const Logo: FC = () => {
  return (
    <Container>
      <Row>
      <Col>
        <img
          src={coffeeCup}
          alt="Logo"
          className={style.ImageBanner}
        />
        <label className={cx(style.titleUrl)}>Cafeteria.com</label>
      </Col>
    </Row>

    <Row>
      <Col>
      <Footer/>
      </Col>
    </Row>
    </Container>
  )
}

export default Logo
