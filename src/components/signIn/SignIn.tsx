import { Card, Col, Form, Row } from 'react-bootstrap'
import { FC, SyntheticEvent, useReducer, useState } from 'react'
import { InputInfo, InputInfoSet } from '../../models/InputInfo'
import { Link } from 'react-router-dom'
import { buildApiCatchMessage } from '../../shared/utils/buildApiCatchMessage'
import { buildUserCookieInfo } from '../../shared/utils/AuthUserHelper'
import { emailValidator, noEmptyValidator } from '../../shared/utils/RegexValidator'
import { onBasicLogin } from '../../apis/AuthenticationService'
import { textInputReducer } from '../../shared/utils/InputReducer'
import { toast } from 'react-toastify'
import { useSignIn } from 'react-auth-kit'
import AuthResponse from '../../models/responses/AuthResponse'
import FormSocialManager from '../socialLinks/SocialLinks'
import PubSub from 'pubsub-js'
import PubSubTopic from '../../models/PubSubTopic'
import SignInRequest from '../../models/requests/SignInRequest'
import SocialEvent from '../../models/SocialEvent'
import SubmitButton from '../../shared/components/submitButton/SubmitButton'
import cx from 'classnames'

const SignIn: FC = () => {
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
      noEmptyValidator(action.value, 10),
      'Your password address is invalid. Please check! (should be at least 8 characters)'
    )
  }

  const [email, dispatchEmail] = useReducer(emailReducer, new InputInfo())
  const [password, dispatchPassword] = useReducer(passwordReducer, new InputInfo())
  const [rememberMe, setRememberMe] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    setSubmitting(true)

    const request = new SignInRequest(email.value, password.value, rememberMe)

    onBasicLogin(request)
      .then((res: AuthResponse) => {
        toast.success('Sign in completed')
        signIn({
          token: res.token,
          expiresIn: res.expiresIn,
          tokenType: 'Bearer',
          authState: { user:  buildUserCookieInfo(res)}
        })

        PubSub.publish(PubSubTopic[PubSubTopic.SIGN_IN], {email: email.value})
      })
      .catch((err: Error) => toast.error(buildApiCatchMessage(err)))
      .finally(() => setSubmitting(false))
  }

  return (
    <Card className={'card-form'}>
      <Card.Header>
        <Row>
          <Col
          as="h5"
        >
          Sign In
        </Col>
        <Col
            className={cx('float-start')}
        >
          <Link
            to={'/sign-up'}
            className={cx('primaryIconBtn', 'float-end')}
          >
            &nbsp;Not a member yet
          </Link>
        </Col>
        </Row>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group
            as={Row}
            className={cx('mb-3')}
          >
            <Col>
              <Form.Label>Email:</Form.Label>
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
                id={'login-email'}
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
            className={cx('mb-3')}
          >
            <Col>
              <Form.Label>Password:</Form.Label>
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
                id={'login-password'}
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
              <Form.Check.Input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={cx('primaryCheck', 'float-start')}
                id={'singIn-remember'}
              />
              &nbsp;remember me&nbsp;
              <Link
                to={'/forgot-password'}
                className={cx('primaryIconBtn', 'float-end')}
              >
                &nbsp;Forgot Password?
              </Link>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className={cx('mb-3', 'text-center')}
          >
            <Col>
              <SubmitButton
                submitting={submitting}
                beforeLabel={'Sign in'}
                afterLabel={'Signing in'}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className={cx('mb-3', 'text-center')}
          >
            <Form.Label> Or sign in with:</Form.Label>
          </Form.Group>

          <Form.Group
            as={Row}
            className={cx('mb-3', 'text-center')}
          >
            <FormSocialManager socialEvent={SocialEvent.SignIn} />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default SignIn
