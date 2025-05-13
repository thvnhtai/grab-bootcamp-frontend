/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useState } from 'react';

import dayjs from 'dayjs';
import { Divider, Form, Tabs, Typography } from 'antd';

import { Rule } from 'antd/es/form';

import { styles } from './AuthPage.styles';
import Logo from '../../components/static/Logo';
import { setMessages } from '../../redux/slices/appSlice';
import { LoginCredentials, SignupCredentials } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Button, GoogleIcon, SignInForm, SignUpForm } from '../../components';
import {
  login,
  selectAuthLoading,
  selectAuthMessage,
  signup
} from '../../redux/slices/authSlice';
import { Message } from '../../enums/message.enum';

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

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const [signinForm] = Form.useForm();
  const [signupForm] = Form.useForm();
  const isLoading = useAppSelector(selectAuthLoading);
  const messageInfo = useAppSelector(selectAuthMessage);
  const [activeTab, setActiveTab] = useState<TabKey>('signin');

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
    dispatch(
      setMessages([
        {
          type: Message.INFO,
          message: 'Google login is not implemented yet',
          description: 'Please sign in with your email and password'
        }
      ])
    );
  }, [dispatch]);

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
