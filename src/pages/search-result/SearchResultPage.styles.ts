import { css } from '@emotion/react';

import { Styles } from '../../types';

export const styles: Styles = {
  container: css`
    min-height: 100vh;
    padding: 2rem 5%;
    background-color: var(--bg-primary);
  `,
  header: css`
    margin-bottom: 1.5rem;
  `,
  backLink: css`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary-1);
    font-weight: 500;
    text-decoration: none;
    &:hover {
      color: var(--primary-color);
    }
  `,
  imagePreview: css`
    width: 5rem;
    height: 5rem;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--bg-disabled);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
  `,
  previewImage: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  filters: css`
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
    background-color: var(--bg-primary);
    padding-right: 1rem;
    @media (min-width: 768px) {
      position: sticky;
      top: 6rem;
      align-self: flex-start;
      max-height: calc(100vh - 4rem);
    }
  `,
  loading: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    width: 100%;
  `,
  empty: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    width: 100%;
  `
};
