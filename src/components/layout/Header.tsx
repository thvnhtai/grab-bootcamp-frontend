/** @jsxImportSource @emotion/react */
import { useState } from 'react';

import { Col, Drawer, Dropdown, Menu, MenuProps, Row } from 'antd';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { css } from '@emotion/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';

import Logo from '../static/Logo';
import { Button } from '../common';
import { Styles } from '../../types';
import { PageURLs } from '../../utils/navigate';
import { logout } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const styles: Styles = {
  underlineLink: css`
    color: var(--border-color);
    font-weight: 500;
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 2px;
      background-color: currentColor;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
    }

    &.active {
      color: var(--primary-color);
    }

    &:hover {
      color: var(--primary-color);
    }
  `
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
  };

  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path === PageURLs.ofHome()) return ['home'];
    if (path === PageURLs.ofSearch()) return ['search'];
    return [];
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'user',
      label: (
        <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
          {user?.username}
        </span>
      ),
      disabled: true
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      label: 'Log Out',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true
    }
  ];

  return (
    <Row
      align='middle'
      justify='space-between'
      style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
        padding: '16px 35px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}
    >
      {/* Logo */}
      <Col>
        <Logo />
      </Col>

      {/* Desktop Navigation */}
      <Col xs={0} md={12}>
        <Row justify='end' gutter={24} align='middle'>
          <Col>
            <NavLink to={PageURLs.ofHome()} css={styles.underlineLink}>
              Home
            </NavLink>
          </Col>

          <Col>
            <NavLink to={PageURLs.ofSearch()} css={styles.underlineLink}>
              Search
            </NavLink>
          </Col>

          <Col>
            {isAuthenticated ? (
              <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                <Button variant='outlined' shape='round' iconPosition='end'>
                  <UserCircleIcon width={24} height={24} />
                  <MenuOutlined style={{ marginRight: 8 }} />
                </Button>
              </Dropdown>
            ) : (
              <Button
                variant='solid'
                onClick={() => navigate(PageURLs.ofAuth())}
              >
                Sign In
              </Button>
            )}
          </Col>
        </Row>
      </Col>

      {/* Mobile Menu Button */}
      <Col md={0}>
        <Button
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuOpen(true)}
          variant='outlined'
        />
      </Col>

      {/* Mobile Drawer */}
      <Drawer
        placement='top'
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        height={'fit-content'}
      >
        <Menu
          mode='vertical'
          selectedKeys={getSelectedKeys()}
          css={css`
            .ant-menu-item-selected {
              background-color: var(--green-color-1);
              color: var(--primary-color) !important;
            }
          `}
        >
          <Menu.Item key='home'>
            <Link
              to={PageURLs.ofHome()}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key='search'>
            <Link
              to={PageURLs.ofSearch()}
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link>
          </Menu.Item>
          <Menu.Divider />
          {isAuthenticated ? (
            <>
              <Menu.Item disabled style={{ color: 'var(--text-primary)' }}>
                {user?.username}
              </Menu.Item>
              <Menu.Item
                key='logout'
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                danger
              >
                Log Out
              </Menu.Item>
            </>
          ) : (
            <Button
              variant='solid'
              style={{ marginTop: '1rem' }}
              onClick={() => navigate(PageURLs.ofAuth())}
            >
              Sign In
            </Button>
          )}
        </Menu>
      </Drawer>
    </Row>
  );
}
