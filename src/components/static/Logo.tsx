/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { Styles } from '../../types/utility';

export default function Logo() {
  return (
    <Link to='/home' css={styles.logo}>
      <span style={{ color: '#364573' }}>Eatery</span>
      <span style={{ color: '#00b14f' }}>Finder</span>
    </Link>
  );
}

const styles: Styles = {
  logo: {
    fontSize: '24px',
    fontWeight: 700,
    fontFamily: 'Lobster, sans-serif'
  }
};
