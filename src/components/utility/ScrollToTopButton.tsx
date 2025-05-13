/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';

import { Button } from 'antd';

import { css } from '@emotion/react';
import { UpOutlined } from '@ant-design/icons';
import { keyframes } from '@emotion/react';
import { Styles } from '../../types';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const styles: Styles = {
  scrollButton: css`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: ${fadeInUp} 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;

    &:hover {
      background-color: var(--green-color-7) !important;
      border-color: var(--green-color-7) !important;
      transform: translateY(-2px);
    }

    &:active {
      background-color: var(--green-color-8) !important;
      transform: scale(0.95);
    }

    @media (max-width: 768px) {
      bottom: 1rem;
      right: 1rem;
      width: 40px;
      height: 40px;
    }
  `
};

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    visible && (
      <Button
        type='primary'
        shape='circle'
        icon={<UpOutlined />}
        onClick={scrollToTop}
        css={styles.scrollButton}
      />
    )
  );
};

export default ScrollToTopButton;
