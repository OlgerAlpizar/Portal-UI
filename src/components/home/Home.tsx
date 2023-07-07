import { Button, Carousel, Col, Row } from 'react-bootstrap'
import { FC, useContext } from 'react'
import { authVerification } from '../../apis/AuthenticationService'
import { authenticationApi } from '../../configurations/settings'
import { parseCatchMessage } from '../../shared/utils/MessageHelper'
import { toast } from 'react-toastify'
import { useAxiosInstance } from '../../shared/hooks/AxiosHook'
import SecurityContext from '../../contexts/SecurityContext'
import style from './Home.module.scss'

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

  const onAuthVerification = () => {
    authVerification(authApiInstance)
      .then(() =>
        toast.success(
          `user authenticated: ${ctx?.authenticator.currentUser.email}`
        )
      )
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(`No user authenticated. ${parseCatchMessage(err)}`)
        toast.error('No user authenticated')
      })
  }

  return (
    <div>
      <Row>
        <Col>
          <Button onClick={onAuthVerification} className='primaryBtn float-end'>am I authenticated?</Button>
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
