import { FC } from 'react'
import { Col, Row } from 'react-bootstrap'
import coffeeCup from '../../../assets/images/coffee_cup.png'
import style from './Logo.module.scss'
import cx from 'classnames'

const Logo: FC = () => {
  return (
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
  )
}

export default Logo
