import { css } from '@emotion/react';

import { Styles } from '../../types';

export const styles: Styles = {
  pageContainer: css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-color);
  `,
  contentWrapper: css`
    flex: 1;
    margin: 0 auto;
    padding: 2rem 1rem;
    width: 100%;
    max-width: 1200px;
  `,
  header: css`
    text-align: center;
    margin-bottom: 2.5rem;
  `,
  heading: css`
    font-size: 1.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  `,
  subtitle: css`
    font-size: 1rem;
    color: var(--text-secondary-1);
    max-width: 36rem;
    margin: 0 auto;
    line-height: 1.5;
  `,
  uploadSection: css`
    margin-bottom: 3rem;
  `,
  analysisControls: css`
    text-align: center;
    margin-top: 2rem;
  `,
  analyzeButton: css`
    padding: 1.2rem 2rem;
    min-width: 200px;
  `,
  howItWorks: css`
    margin-top: 4rem;
  `,
  sectionHeading: css`
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2rem;
    color: var(--text-primary);
  `,
  stepsContainer: css`
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(1, 1fr);
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  `,
  stepCard: css`
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s ease;
    border: none;
    &:hover {
      transform: translateY(-2px);
    }
  `,
  stepIndicator: css`
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 1rem;
  `,
  stepTitle: css`
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  `,
  stepDescription: css`
    color: var(--text-secondary-1);
    font-size: 0.875rem;
    line-height: 1.4;
  `,
  loadingText: css`
    margin-top: 16px;
    text-align: center;
    color: #888;
  `
};
