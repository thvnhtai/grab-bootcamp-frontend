/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      css={css`
        color: var(--text-secondary-1);
        border-top: 1px solid var(--border-color);
        padding: 1.5rem 0;
        text-align: center;
      `}
    >
      <p>&copy; {currentYear} EateryFinder. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
