/** @jsxImportSource @emotion/react */
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Divider, Form, Tabs, Typography } from 'antd';
import { Rule } from 'antd/es/form';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { FormField } from '../../components/FormField';
import { GoogleIcon } from '../../components/static/GoogleIcon';
import Logo from '../../components/static/Logo';

type TabKey = 'signin' | 'signup';

const { Text } = Typography;

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('signin');
  const [loading, setLoading] = useState(false);
  const [signinForm] = Form.useForm();
  const [signupForm] = Form.useForm();

  const nameRules: Rule[] = [
    { required: true, message: 'Please enter your name' }
  ];

  const emailRules: Rule[] = [
    {
      required: true,
      message: 'Please enter your email'
    },
    {
      type: 'email',
      message: 'Please enter a valid email'
    }
  ];

  const passwordRules: Rule[] = [
    { required: true, message: 'Please enter your password' }
  ];

  const handleSignIn = async () => {
    try {
      setLoading(true);
      console.log('Sign In submit', signinForm.getFieldsValue());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      console.log('Sign Up submit', signupForm.getFieldsValue());
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div css={styles.pageContainer}>
      <main css={styles.contentWrapper}>
        <div css={styles.card}>
          <div css={styles.cardOverlay}></div>
          <div css={styles.cardContent}>
            <div css={styles.headerWrapper}>
              <div>
                <Logo />
              </div>
              <Text css={styles.subtitle}>
                {activeTab === 'signin'
                  ? 'Sign in to your account to continue'
                  : 'Create an account to get started'}
              </Text>
            </div>

            <Tabs
              activeKey={activeTab}
              onChange={(key: string) => setActiveTab(key as TabKey)}
              centered
              items={[
                {
                  key: 'signin',
                  label: 'Sign In',
                  children: (
                    <Form
                      form={signinForm}
                      layout='vertical'
                      onFinish={handleSignIn}
                      requiredMark={false}
                    >
                      <FormField
                        name='email'
                        rules={emailRules}
                        prefixIcon={<MailOutlined />}
                        placeholder='Enter your email'
                      />
                      <FormField
                        name='password'
                        rules={passwordRules}
                        prefixIcon={<LockOutlined />}
                        placeholder='Enter your password'
                        password
                      />

                      <Form.Item>
                        <Button
                          htmlType='submit'
                          variant='solid'
                          css={styles.fullWidthButton}
                          loading={loading}
                          style={{ marginTop: '1rem' }}
                        >
                          Log In
                        </Button>
                      </Form.Item>
                    </Form>
                  )
                },
                {
                  key: 'signup',
                  label: 'Sign Up',
                  children: (
                    <Form
                      form={signupForm}
                      layout='vertical'
                      onFinish={handleSignUp}
                      requiredMark={false}
                    >
                      <FormField
                        name='name'
                        rules={nameRules}
                        prefixIcon={<UserOutlined />}
                        placeholder='e.g. John Doe'
                      />
                      <FormField
                        name='email'
                        rules={emailRules}
                        prefixIcon={<MailOutlined />}
                        placeholder='e.g. your@email.com'
                      />
                      <FormField
                        name='password'
                        rules={passwordRules}
                        prefixIcon={<LockOutlined />}
                        placeholder='At least 8 characters'
                        password
                      />
                      <Form.Item>
                        <Button
                          htmlType='submit'
                          variant='solid'
                          css={styles.fullWidthButton}
                          loading={loading}
                          style={{ marginTop: '1rem' }}
                        >
                          Create Account
                        </Button>
                      </Form.Item>
                    </Form>
                  )
                }
              ]}
            />

            <Divider css={styles.divider}>
              <div>
                <span>or</span>
              </div>
            </Divider>

            <Button
              variant='outlined'
              css={styles.fullWidthButton}
              onClick={handleGoogleLogin}
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;

const styles = {
  pageContainer: css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg-secondary-1);
    overflow: hidden;
  `,

  contentWrapper: css`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    overflow: auto;
  `,

  card: css`
    width: 100%;
    max-width: 28rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    position: relative;
    overflow: hidden;
    background-image: url('https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=2070');
    background-size: cover;
    background-position: center;
  `,

  cardOverlay: css`
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(4px);
  `,

  cardContent: css`
    position: relative;
    z-index: 10;
  `,

  headerWrapper: css`
    text-align: center;
    margin-bottom: 1rem;
  `,

  heading: css`
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-family: 'Lobster', sans-serif;
  `,

  branding: css`
    .secondary {
      color: var(--text-secondary-1);
    }
    .primary {
      color: var(--primary-color);
    }
  `,

  subtitle: css`
    color: var(--text-secondary-1);
  `,

  fullWidthButton: css`
    width: 100%;
    padding: 1.4rem;
    font-size: 1rem;
    border-radius: 0.5rem;
  `,

  divider: css`
    span {
      font-size: 0.875rem;
      font-weight: 400;
      color: var(--text-inactive);
    }
  `
};
