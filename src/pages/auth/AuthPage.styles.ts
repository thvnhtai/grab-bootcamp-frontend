import { css } from '@emotion/react';
import { Styles } from '../../types';

export const styles: Styles = {
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
