/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Divider, Form, Tabs, Typography } from 'antd';
import { Rule } from 'antd/es/form';
import { lazy, useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '../../components/Button';
import { GoogleIcon } from '../../components/static/GoogleIcon';
import Logo from '../../components/static/Logo';

import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setMessages } from '../../redux/slices/appSlice';
import {
  login,
  selectAuthLoading,
  selectAuthMessage,
  signup
} from '../../redux/slices/authSlice';

import { Styles } from '../../types/utility';
import { LoginCredentials, SignupCredentials } from '../../types/auth';

const SignInForm = lazy(() => import('../../components/forms/SignInForm'));
const SignUpForm = lazy(() => import('../../components/forms/SignUpForm'));

const FORM_RULES: Record<string, Rule[]> = {
  name: [
    { required: true, message: 'Please enter your name' },
    { min: 3, message: 'Name must be at least 3 characters' },
    { max: 50, message: 'Name must be at most 50 characters' }
  ],
  email: [
    { required: true, message: 'Please enter your email' },
    { type: 'email', message: 'Please enter a valid email' }
  ],
  password: [
    { required: true, message: 'Please enter your password' },
    { min: 6, message: 'Password must be at least 6 characters' }
  ],
  gender: [{ required: true, message: 'Please select your gender' }],
  dob: [{ required: true, message: 'Please select your date of birth' }]
} as const;

type TabKey = 'signin' | 'signup';

const styles: Styles = {
  pageContainer: css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg-secondary-1);
  `,
  contentWrapper: css`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  `,
  card: css`
    width: 100%;
    max-width: 28rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    position: relative;
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
    z-index: 1;
  `,
  headerWrapper: css`
    text-align: center;
    margin-bottom: 1.5rem;
  `,
  subtitle: css`
    color: var(--text-secondary-1);
    display: block;
    margin-top: 0.5rem;
    font-size: 0.875rem;
  `,
  fullWidthInput: css`
    width: 100%;
  `,
  fullWidthButton: css`
    width: 100%;
    padding: 1.2rem;
    font-size: 1rem;
    border-radius: 0.5rem;
  `,
  divider: css`
    margin: 1.5rem 0;
  `
};

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('signin');
  const [signinForm] = Form.useForm();
  const [signupForm] = Form.useForm();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const messageInfo = useAppSelector(selectAuthMessage);

  useEffect(() => {
    if (messageInfo) {
      dispatch(
        setMessages([
          {
            type: messageInfo?.type,
            message: messageInfo?.message,
            description: messageInfo?.description
          }
        ])
      );
    }
  }, [dispatch, messageInfo]);

  const handleSignIn = useCallback(async () => {
    await signinForm.validateFields();
    await dispatch(
      login(signinForm.getFieldsValue() as LoginCredentials)
    ).unwrap();
  }, [dispatch, signinForm]);

  const handleSignUp = useCallback(async () => {
    await signupForm.validateFields();
    const values = signupForm.getFieldsValue() as SignupCredentials;
    const formattedValues = {
      ...values,
      dateOfBirth: dayjs(values.dateOfBirth).format('YYYY-MM-DD')
    };
    await dispatch(signup(formattedValues)).unwrap();
  }, [dispatch, signupForm]);

  const handleGoogleLogin = useCallback(() => {
    console.log('Google login initiated');
  }, []);

  const tabItems = useMemo(
    () => [
      {
        key: 'signin',
        label: 'Sign In',
        children: (
          <SignInForm
            form={signinForm}
            onFinish={handleSignIn}
            isLoading={isLoading}
            rules={FORM_RULES}
            styles={styles}
          />
        )
      },
      {
        key: 'signup',
        label: 'Sign Up',
        children: (
          <SignUpForm
            form={signupForm}
            onFinish={handleSignUp}
            isLoading={isLoading}
            rules={FORM_RULES}
            styles={styles}
          />
        )
      }
    ],
    [handleSignIn, handleSignUp, isLoading, signinForm, signupForm]
  );

  return (
    <div css={styles.pageContainer}>
      <main css={styles.contentWrapper}>
        <section css={styles.card}>
          <div css={styles.cardOverlay} />
          <div css={styles.cardContent}>
            <header css={styles.headerWrapper}>
              <Logo />
              <Typography.Text css={styles.subtitle}>
                {activeTab === 'signin'
                  ? 'Sign in to your account to continue'
                  : 'Create an account to get started'}
              </Typography.Text>
            </header>

            <Tabs
              activeKey={activeTab}
              onChange={(key: string) => setActiveTab(key as TabKey)}
              centered
              items={tabItems}
            />

            <Divider css={styles.divider}>
              <Typography.Text type='secondary'>or</Typography.Text>
            </Divider>

            <Button
              variant='outlined'
              css={styles.fullWidthButton}
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AuthPage;
