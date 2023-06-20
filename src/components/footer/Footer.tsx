import { FC, useContext } from "react";
import { AppCustomContext } from "../../contexts/AppCustomContext";
import cx from 'classnames'
import style from './Footer.module.scss'

const Footer: FC = () => {
  const ctx = useContext(AppCustomContext)

  return (
    <div className='footer'>
    <footer className={cx(style.footer, "justify-content-between align-items-center text-body-secondary ")}>
      <p className="justify-content-start">&copy; 2023 Olger Alpizar Chaves, Inc</p>
      <p className="justify-content-end">{ctx?.location} {ctx?.date}</p>
    </footer>
    </div>
  )
}

export default Footer