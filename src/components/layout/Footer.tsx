/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Styles } from '../../types/utility';

const styles: Styles = {
  container: css`
    color: var(--text-secondary-1);
    border-top: 1px solid var(--border-color);
    padding: 1.5rem 0;
    text-align: center;
  `
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer css={styles.container}>
      <p>&copy; {currentYear} EateryFinder. All rights reserved.</p>
    </footer>
  );
}
