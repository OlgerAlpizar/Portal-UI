import { AiOutlineUser } from 'react-icons/ai'
import { Container, Navbar } from 'react-bootstrap'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import coffeeCup from '../../assets/images/coffee_cup.png'
import cx from 'classnames'
import style from './Header.module.scss'

const Header: FC = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
          <Link to={'/'} className={cx('primaryIconBtn', style.brand)}>
            <img
              src={coffeeCup}
              alt="Logo"
              className={style.imageBrand}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

          <Link
            to={'user'}
            className={cx('primaryIconBtn', 'me-auto', 'my-2 my-lg-0', style.navItem)}
          >
            &nbsp;Users
          </Link>
          <Link
            to={'authentication'}
            className={cx('primaryIconBtn', style.singIn)}
          >
            <AiOutlineUser
              title="Sing in"
              size={20} />&nbsp;Sing In
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header