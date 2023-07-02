import { Carousel } from 'react-bootstrap'
import { FC } from 'react'

const Home: FC = () => {
  const news = [
    { title: 'Title 1', details: 'description 1', imgSrc: 'https://www.advabilities.com/wp-content/uploads/2022/05/default-image.png' },
    { title: 'Title 2', details: 'description 2', imgSrc: 'https://www.advabilities.com/wp-content/uploads/2022/05/default-image.png' },
    { title: 'Title 3', details: 'description 3', imgSrc: 'https://www.advabilities.com/wp-content/uploads/2022/05/default-image.png' },
  ]

  return (
    <Carousel data-bs-theme="dark">
      {
        news.map(item => {
          return (
              <Carousel.Item key={item.title} >
                <img
                  className="d-block w-100"
                  src={item.imgSrc}
                  alt={item.title}
                />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.details}</p>
                </Carousel.Caption>
              </Carousel.Item>

          )
        })
      }


    </Carousel>
  )
}

export default Home