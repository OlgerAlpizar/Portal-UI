import { BsFacebook, BsGoogle } from 'react-icons/bs'
import { Col } from 'react-bootstrap'
import { FC } from 'react'
import {
  onLoginSocialLink,
  onRegisterSocialLink,
} from '../../apis/AuthenticationService'
import { toast } from 'react-toastify'
import ButtonIcon from '../../shared/components/iconButton/IconButton'
import SocialEvent from '../../models/SocialEvent'
import SocialLink from '../../models/SocialLink'

type SocialLinksProps = {
  socialEvent: SocialEvent
}

const SocialLinks: FC<SocialLinksProps> = (props: SocialLinksProps) => {
  const onSocialLinkClick = (link: SocialLink) => {
    switch (props.socialEvent) {
      case SocialEvent.SignIn:
        onLoginSocialLink(link)
          .then((res) => toast.success(`Not implemented ${res}`))
          .catch((err) => toast.error(err))
        break
      case SocialEvent.Register:
        onRegisterSocialLink(link)
          .then((res) => toast.success(`Not implemented ${res}`))
          .catch((err) => toast.error(err))
        break
    }
  }

  return (
    <>
      <Col sm={6}>
        <ButtonIcon
          type="button"
          label=""
          onClick={() => onSocialLinkClick(SocialLink.FACEBOOK)}
        >
          <BsFacebook
            className={'primaryIconBtn'}
            title="Facebook"
            size={30}
          />
        </ButtonIcon>
      </Col>

      <Col sm={6}>
        <ButtonIcon
          type="button"
          label=""
          onClick={() => onSocialLinkClick(SocialLink.GOOGLE)}
        >
          <BsGoogle
            className={'primaryIconBtn'}
            title="Gmail"
            size={30}
          />
        </ButtonIcon>
      </Col>
    </>
  )
}

export default SocialLinks
