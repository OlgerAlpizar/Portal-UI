import { Col, Container, Row } from 'react-bootstrap'
import { FC } from 'react'
import Footer from '../footer/Footer'
import coffeeCup from '../../../assets/images/coffee_cup.png'
import cx from 'classnames'
import style from './Logo.module.scss'

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
          <Footer />
        </Col>
      </Row>
    </Container>
  )
}

export default Logo
