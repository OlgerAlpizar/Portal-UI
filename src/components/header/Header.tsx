import { AiOutlineUser } from 'react-icons/ai'
import { Container, NavDropdown, Navbar } from 'react-bootstrap'
import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import { PortalContext } from '../../contexts/PortalContext'
//import { useSignOut } from 'react-auth-kit'
import coffeeCup from '../../shared/assets/images/coffee_cup.png'
import cx from 'classnames'
import style from './Header.module.scss'

const Header: FC = () => {
  const ctx = useContext(PortalContext)
  //const signOut = useSignOut()

  const onSignOut  = () => {
    //signOut()
  }

  const loginNav = () => {
    return ctx?.isAuthenticated ? (
      <NavDropdown title="User Dropdown">
        <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={onSignOut}>
          Sign Out
        </NavDropdown.Item>
      </NavDropdown>
    ) : (
      <Link
        to={'auth'}
        className={cx('primaryIconBtn', style.singIn)}
      >
        <AiOutlineUser
          title="Sing in"
          size={20} />&nbsp;Sing In
      </Link>
    )
  }

  const restrictedNav = () => {
    return ctx?.isAuthenticated ? (
      <Link
        to={'user'}
        className={cx('primaryIconBtn', 'me-auto', 'my-2 my-lg-0', style.navItem)}
      >
        &nbsp;Users
      </Link>
    ) : (
      <></>
    )
  }

  const openNav = () => {
    return (
      <></>
    )
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>

        <Navbar.Brand>
          <Link to={'/'} className={style.brand}>
            <img
              src={coffeeCup}
              alt="Logo"
              className={style.imageBrand}
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          {openNav()}
          {restrictedNav()}
          {loginNav()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header