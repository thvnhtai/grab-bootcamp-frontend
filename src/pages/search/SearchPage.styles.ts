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

    @media (max-width: 480px) {
      padding: 1.5rem 0.75rem;
    }
  `,
  header: css`
    text-align: center;
    margin-bottom: 2rem;

    @media (max-width: 480px) {
      margin-bottom: 1.5rem;
    }
  `,
  heading: css`
    font-size: 1.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  `,
  subtitle: css`
    font-size: 1rem;
    color: var(--text-secondary-1);
    max-width: 36rem;
    margin: 0 auto;
    line-height: 1.5;

    @media (max-width: 480px) {
      font-size: 0.875rem;
    }
  `,
  uploadSection: css`
    margin-bottom: 3rem;
  `,
  analysisControls: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  `,
  selectContainer: css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  `,
  selectLabel: css`
    color: var(--text-secondary-1);
    font-size: 0.875rem;
  `,
  restaurantSelect: css`
    width: 120px;
    .ant-select-selector {
      border-radius: 0.5rem;
    }
  `,
  analyzeButton: css`
    padding: 1.2rem 2rem;
    min-width: 200px;
    font-size: 1rem;
    background-color: var(--primary-color);
    border-radius: 0.5rem;
    color: white;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      background-color: var(--primary-color-dark);
    }

    &:active {
      transform: scale(1);
      background-color: var(--primary-color);
    }

    @media (max-width: 480px) {
      padding: 1.2rem;
      width: 80%;
      font-size: 0.9rem;
    }
  `,
  disabledButton: css`
    background-color: #e0e0e0;
    cursor: not-allowed;
    color: #888;
  `,
  spinner: css`
    margin-right: 0.5rem;
    vertical-align: middle;
  `,
  howItWorks: css`
    margin-top: 4rem;

    @media (max-width: 480px) {
      margin-top: 2rem;
    }
  `,
  sectionHeading: css`
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2rem;
    color: var(--text-primary);

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  `,
  stepsContainer: css`
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(1, 1fr);

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  `,
  stepCard: css`
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.2s ease;
    padding: 1rem;
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

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  `,
  stepDescription: css`
    color: var(--text-secondary-1);
    font-size: 0.875rem;
    line-height: 1.4;

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  `,
  loadingText: css`
    margin-top: 16px;
    text-align: center;
    color: #888;
  `
};
