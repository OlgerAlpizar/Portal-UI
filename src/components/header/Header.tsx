import { AiOutlineUser } from 'react-icons/ai'
import { Container, NavDropdown, Navbar } from 'react-bootstrap'
import { FC, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PortalContext } from '../../contexts/PortalContext'
import { beginUpperCase } from '../../shared/utils/TextHelper'
import { getUserAvatar } from '../../shared/utils/ImageHelper'
import { useAuthUser, useSignOut } from 'react-auth-kit'
import coffeeCup from '../../assets/images/coffee_cup.png'
import cx from 'classnames'
import style from './Header.module.scss'

const Header: FC = () => {
  const ctx = useContext(PortalContext)
  const signOut = useSignOut()
  const auth = useAuthUser()
  const navigate = useNavigate()
  const location = useLocation()

  const onSignOut = () => {
    signOut()
    ctx?.setIsAuthenticated(false)
    navigate('/')
  }

  const loginNav = () => {
    return ctx?.isAuthenticated ? (
      <>
        <img src={getUserAvatar(auth()?.user.avatar)} className={cx('rounded-circle', style.avatar)} alt="account"></img>
        <NavDropdown title={`${beginUpperCase(auth()?.user.firstName)} ${beginUpperCase(auth()?.user.lastName)}`} align="end">
          <NavDropdown.Item href="#action/3.1">My account</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={onSignOut}>
            Sign Out
          </NavDropdown.Item>
        </NavDropdown>
      </>
    ) : (
      !location.pathname.includes('sign-in') && (
        <Link
          to={'sign-in'}
          className={cx('primaryIconBtn', style.singIn)}
        >
          <AiOutlineUser
            title="Sing in"
            size={20} />&nbsp;Sing In
        </Link>
      )
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

  return (
    <div>
      <Navbar expand="lg" className={cx('bg-body-tertiary', style.headerContainer)}>
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

          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            {restrictedNav()}
            {loginNav()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header