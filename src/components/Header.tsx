/** @jsxImportSource @emotion/react */
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Col, Drawer, Dropdown, Menu, Row } from 'antd';
import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import { Button } from './Button';
const Header = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      key: 'user',
      label: <span style={{ fontWeight: 500 }}>{user?.fullName}</span>,
      disabled: true
    },
    {
      key: 'logout',
      label: (
        <div onClick={handleLogout}>
          <LogoutOutlined style={{ marginRight: 8 }} />
          <span>Log out</span>
        </div>
      )
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
        <Link to='/' style={{ fontSize: '24px', fontWeight: 700 }}>
          <span style={{ color: '#364573' }}>Eatery</span>
          <span style={{ color: '#00b14f' }}>Finder</span>
        </Link>
      </Col>

      {/* Desktop Navigation */}
      <Col xs={0} md={12}>
        <Row justify='end' gutter={24} align='middle'>
          <Col>
            <NavLink to='/home' css={underlineLink}>
              Home
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
              <Button variant='solid' onClick={() => navigate('/auth')}>
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
          selectedKeys={location.pathname === '/home' ? ['home'] : []}
          css={css`
            .ant-menu-item-selected {
              background-color: var(--green-color-1);
              color: var(--primary-color) !important;
            }
          `}
        >
          <Menu.Item key='home'>
            <Link to='/home' onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Divider />
          {isAuthenticated ? (
            <>
              <Menu.Item disabled>{user?.fullName}</Menu.Item>
              <Menu.Item
                key='logout'
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Log Out
              </Menu.Item>
            </>
          ) : (
            <Button
              type='primary'
              block
              style={{ marginTop: '1rem' }}
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
          )}
        </Menu>
      </Drawer>
    </Row>
  );
};

export default Header;

const underlineLink = css`
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
`;
