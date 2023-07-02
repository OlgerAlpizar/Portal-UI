import { BsInfoCircle } from 'react-icons/bs'
import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Popover,
  PopoverBody,
  Row,
} from 'react-bootstrap'
import { FC, SyntheticEvent, useReducer, useState } from 'react'
import { InputInfo, InputInfoSet } from '../../models/InputInfo'
import { Link } from 'react-router-dom'
import { buildApiCatchMessage } from '../../shared/utils/buildApiCatchMessage'
import { buildUserCookieInfo } from '../../shared/utils/AuthUserHelper'
import {
  conformPasswordValidator,
  emailValidator,
  noEmptyOrSpecialValidator,
  passwordValidator,
} from '../../shared/utils/RegexValidator'
import { onBasicRegister } from '../../apis/AuthenticationService'
import { textInputReducer } from '../../shared/utils/InputReducer'
import { toast } from 'react-toastify'
import { useSignIn } from 'react-auth-kit'
import AuthResponse from '../../models/responses/AuthResponse'
import CreateAccountRequest from '../../models/requests/CreateAccountRequest'
import FormSocialManager from '../socialLinks/SocialLinks'
import PubSub from 'pubsub-js'
import PubSubTopic from '../../models/PubSubTopic'
import SocialEvent from '../../models/SocialEvent'
import SubmitButton from '../../shared/components/submitButton/SubmitButton'
import TermsConditions from '../termsConditions/TermsConditions'

const SignUp: FC = () => {
  const signIn = useSignIn()

  const emailReducer = (currentState: InputInfo, action: InputInfoSet) => {
    return textInputReducer(
      currentState,
      action,
      emailValidator(action.value),
      'Your email address is invalid. Please check!'
    )
  }

  const passwordReducer = (currentState: InputInfo, action: InputInfoSet) => {
    return textInputReducer(
      currentState,
      action,
      passwordValidator(action.value),
      'Your password is invalid. Please check! (should be at least 8 characters)'
    )
  }

  const conformPasswordReducer = (
    currentState: InputInfo,
    action: InputInfoSet
  ) => {
    return textInputReducer(
      currentState,
      action,
      conformPasswordValidator(action.value, password.value),
      'Your password does not match'
    )
  }

  const regularStringReducer = (
    currentState: InputInfo,
    action: InputInfoSet
  ) => {
    return textInputReducer(
      currentState,
      action,
      noEmptyOrSpecialValidator(action.value),
      'Invalid value (Avoid special characters)'
    )
  }

  const [email, dispatchEmail] = useReducer(emailReducer, new InputInfo())
  const [password, dispatchPassword] = useReducer(
    passwordReducer,
    new InputInfo()
  )
  const [confirmPassword, dispatchConfirmPassword] = useReducer(
    conformPasswordReducer,
    new InputInfo()
  )
  const [firstName, dispatchFirstName] = useReducer(
    regularStringReducer,
    new InputInfo()
  )
  const [lastName, dispatchLastName] = useReducer(
    regularStringReducer,
    new InputInfo()
  )
  const [agreement, setAgreement] = useState(false)
  const [allowNotifications, setAllowNotifications] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    setSubmitting(true)

    const request = new CreateAccountRequest(
      firstName.value,
      lastName.value,
      email.value,
      password.value,
      allowNotifications
    )

    onBasicRegister(request)
      .then((res: AuthResponse) => {
        toast.success('The account has been created')
        signIn({
          token: res.token,
          expiresIn: res.expiresIn,
          tokenType: 'Bearer',
          authState: { user:  buildUserCookieInfo(res)}
        })

        PubSub.publish(PubSubTopic[PubSubTopic.SIGN_UP], email)
      })
      .catch((err: Error) => toast.error(buildApiCatchMessage(err)))
      .finally(() => setSubmitting(false))
  }

  const popOver = (key: string) => {
    const dictionary: { [key: string]: string } = {
      text: 'Just numbers and letters',
      email: 'Format example: your@email.com',
      password:
        'Should contains: 10 characters, at least 2 numbers, at least 2 numbers, at least 2 uppercase, at least 3 lowercase and at least 1 special character',
    }

    return (
      <Popover>
        <PopoverBody>{dictionary[key]}</PopoverBody>
      </Popover>
    )
  }

  const overLay = (key: string) => {
    return (
      <OverlayTrigger
        trigger={['hover', 'hover']}
        placement="top"
        defaultShow={false}
        overlay={popOver(key)}
      >
        <span className={'float-end'}>
          <BsInfoCircle className={'primaryIconBtn'} />
        </span>
      </OverlayTrigger>
    )
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <Card className={'card-form'}>
      <Card.Header>
        <Col
          as="h5"
          className="float-start"
        >
          Create account
        </Col>
        <Col
          className="float-end"
        >
          <Link
            to={'/sign-in'}
            className={'primaryIconBtn'}
          >
            &nbsp;Already a member!
          </Link>
        </Col>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group
            as={Row}
            className={'mb-3'}
          >
            <Col sm={6}>
              <Form.Label>First name</Form.Label>
              {overLay('text')}
              <Form.Control
                type={'text'}
                value={firstName.value}
                placeholder={'First name'}
                onChange={(e) =>
                  dispatchFirstName({ value: e.target.value as string })
                }
                onBlur={() => dispatchFirstName({ value: firstName.value })}
                required
                isInvalid={!firstName.valid}
                autoComplete="off"
                id={'register-first-name'}
                minLength={3}
                maxLength={10}
              />
              <Form.Control.Feedback type="invalid">
                {firstName.error}
              </Form.Control.Feedback>
            </Col>

            <Col sm={6}>
              <Form.Label>Last name</Form.Label>
              {overLay('text')}
              <Form.Control
                type={'text'}
                value={lastName.value}
                placeholder={'Last name'}
                onChange={(e) =>
                  dispatchLastName({ value: e.target.value as string })
                }
                onBlur={() => dispatchLastName({ value: lastName.value })}
                required
                isInvalid={!lastName.valid}
                autoComplete="off"
                id={'register-last-name'}
                minLength={3}
                maxLength={10}
              />
              <Form.Control.Feedback type="invalid">
                {lastName.error}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className={'mb-3'}
          >
            <Col>
              <Form.Label>Email</Form.Label>
              {overLay('email')}
              <Form.Control
                type={'email'}
                value={email.value}
                placeholder={'your@email.com'}
                onChange={(e) =>
                  dispatchEmail({ value: e.target.value as string })
                }
                onBlur={() => dispatchEmail({ value: email.value })}
                required
                isInvalid={!email.valid}
                autoComplete="off"
                id={'register-email'}
                minLength={7}
                maxLength={20}
              />
              <Form.Control.Feedback type="invalid">
                {email.error}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className={'mb-3'}
          >
            <Col>
              <Form.Label>Password</Form.Label>
              {overLay('password')}
              <Form.Control
                type={'password'}
                value={password.value}
                placeholder={'**********'}
                onChange={(e) =>
                  dispatchPassword({ value: e.target.value as string })
                }
                onBlur={() => dispatchPassword({ value: password.value })}
                required
                isInvalid={!password.valid}
                autoComplete="off"
                id={'register-password'}
                minLength={10}
                maxLength={10}
              />
              <Form.Control.Feedback type="invalid">
                {password.error}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className={'mb-3'}
          >
            <Col>
              <Form.Label>Confirm password</Form.Label>
              {overLay('password')}
              <Form.Control
                type={'password'}
                value={confirmPassword.value}
                placeholder={'**********'}
                onChange={(e) =>
                  dispatchConfirmPassword({ value: e.target.value as string })
                }
                onBlur={() =>
                  dispatchConfirmPassword({ value: confirmPassword.value })
                }
                required
                isInvalid={!confirmPassword.valid}
                autoComplete="off"
                id={'register-confirm-password'}
                minLength={10}
                maxLength={10}
              />
              <Form.Control.Feedback type="invalid">
                {confirmPassword.error}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className={'mb-3'}
          >
            <Col>
              <Form.Check.Input
                type={'checkbox'}
                required
                className={'primaryCheck'}
                onChange={(e) => setAgreement(e.target.checked)}
                checked={agreement}
                id={'register-agreement'}
              />
              &nbsp;I have read and agree all the Fenrir Cup&nbsp;
              <Button
                onClick={() => setShowModal(true)}
                className={'primaryIconBtn'}
                variant="link"
              >
                Terms and conditions
              </Button>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className={'mb-3'}
          >
            <Col>
              <Form.Check.Input
                type="checkbox"
                checked={allowNotifications}
                onChange={(e) => setAllowNotifications(e.target.checked)}
                className={'primaryCheck'}
                id={'register-notifications'}
              />
              &nbsp;Yes, I`d like to receive notifications and offers
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className={'mb-3 text-center'}
          >
            <Col>
              <SubmitButton
                submitting={submitting}
                beforeLabel={'Create'}
                afterLabel={'Creating'}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className={'mb-3 text-center'}
          >
            <Form.Label> Or register with:</Form.Label>
          </Form.Group>

          <Form.Group
            as={Row}
            className={'mb-3 text-center'}
          >
            <FormSocialManager socialEvent={SocialEvent.Register} />
          </Form.Group>
        </Form>
        <TermsConditions
          show={showModal}
          onClose={closeModal}
        />
      </Card.Body>
    </Card>
  )
}

export default SignUp
