import { Button, Carousel, Col, Row } from 'react-bootstrap'
import { FC, useContext } from 'react'
import { authVerification, signIn, signOut } from '../../apis/AuthenticationService'
import { authenticationApi } from '../../configurations/settings'
import { parseCatchMessage } from '../../shared/utils/MessageHelper'
import { toast } from 'react-toastify'
import { useAxiosInstance } from '../../shared/hooks/AxiosHook'
import SecurityContext from '../../contexts/SecurityContext'
import style from './Home.module.scss'
import AuthResponse from '../../apis/responses/AuthResponse'
import SignInRequest from '../../apis/requests/SignInRequest'

const news = [
  {
    title: 'Title 1',
    details: 'description 1',
    imgSrc:
      'https://www.advabilities.com/wp-content/uploads/2022/05/default-image.png',
  },
  {
    title: 'Title 2',
    details: 'description 2',
    imgSrc:
      'https://www.advabilities.com/wp-content/uploads/2022/05/default-image.png',
  },
  {
    title: 'Title 3',
    details: 'description 3',
    imgSrc:
      'https://www.advabilities.com/wp-content/uploads/2022/05/default-image.png',
  },
]

const Home: FC = () => {
  const ctx = useContext(SecurityContext)
  const authApiInstance = useAxiosInstance(authenticationApi())

  const onSignIn = () => {
    const request = new SignInRequest('olger@mail.com', '123asdAS!@', false)
    
    signIn(authApiInstance, request)
    .then((res: AuthResponse) => {
      ctx?.onBasicAuth(res, 'Sign in completed', '/')
    })
    .catch((err: Error) => toast.error(parseCatchMessage(err)))
  }

  const onSignOut = () => {
    signOut(authApiInstance, ctx?.authenticator.currentUser?.email ?? '')
      .then(() => ctx?.onBasicSignOut('/'))
      .then(() => toast.success('sign out success'))
      .catch((err: Error) => toast.error(parseCatchMessage(err)))    
  }

  const onAuthVerification = () => {
    authVerification(authApiInstance)
      .then(() =>
        toast.success(
          `user authenticated: ${ctx?.authenticator.currentUser.email}`
        )
      )
      .catch((err) => {
        toast.error(`No user authenticated. ${parseCatchMessage(err)}`)
      })
  }

  return (
    <div>
      <Row>
        <Col>
          <Button onClick={onSignIn} className='primaryBtn float-end'>Sign In</Button>
        </Col>
        <Col>
          <Button onClick={onSignOut} className='primaryBtn float-end'>Sign out</Button>
        </Col>
        <Col>
          <Button onClick={onAuthVerification} className='primaryBtn float-end'>am I authenticated?</Button>
        </Col>
      </Row>
      
      <Row>
        <Col>
          {ctx?.authenticator.token}
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Carousel data-bs-theme="dark" className={style.carouselRow}>
            {news.map((item) => {
              return (
                <Carousel.Item key={item.title}>
                  <img
                    className={style.carouselImage}
                    src={item.imgSrc}
                    alt={item.title}
                  />
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <p>{item.details}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </Col>
      </Row>
    </div>
  )
}

export default Home
