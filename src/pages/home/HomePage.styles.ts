import { css, keyframes } from '@emotion/react';
import { Styles } from '../../types/utility';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.8); }
  to { transform: scale(1); }
`;

export const getStepCardAnimation = (index: number) => css`
  animation-delay: ${index * 0.1}s;
`;

export const styles: Styles = {
  main: css`
    position: relative;
  `,
  container: css`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 0rem;
  `,
  heroSection: css`
    position: relative;
    padding: 5rem 2rem;
    @media (max-width: 768px) {
      padding: 1rem;
    }
  `,
  heroImageWrapper: css`
    position: absolute;
    inset: 0;
    z-index: 0;
  `,
  heroImage: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  heroOverlay: css`
    position: absolute;
    inset: 0;
    background-color: rgba(54, 69, 115, 0.6);
  `,
  heroContent: css`
    position: relative;
    z-index: 10;
    padding: 5rem 0;
    color: white;
    @media (max-width: 768px) {
      padding: 3rem 1rem;
    }
  `,
  heroTextWrapper: css`
    max-width: 36rem;
    animation: ${fadeIn} 1s ease-in;
  `,
  heroHeading: css`
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  `,
  heroDescription: css`
    font-size: 1.125rem;
    line-height: 1.75;
    margin-bottom: 2rem;
    opacity: 0.9;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  `,
  heroButton: css`
    padding: 1.5rem;
    font-size: 1.125rem;
    @media (max-width: 768px) {
      padding: 1.25rem 0.875rem;
      font-size: 1rem;
    }
  `,
  heroButtonIcon: css`
    margin-left: 0.5rem;
    height: 1.25rem;
    width: 1.25rem;
  `,
  howItWorksSection: css`
    background-color: white;
    padding: 3rem 0;
  `,
  sectionTitle: css`
    font-size: 1.875rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    color: var(--secondary-color);
    @media (max-width: 768px) {
      margin-bottom: 2rem;
    }
  `,
  stepsGrid: css`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(1, 1fr);
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  `,
  stepCard: css`
    text-align: center;
    animation: ${scaleIn} 0.3s ease-in;
    padding: 1.5rem;
  `,
  stepNumber: css`
    background-color: var(--blue-color-1);
    width: 4rem;
    height: 4rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
  `,
  stepTitle: css`
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--secondary-color);
  `,
  stepDescription: css`
    color: var(--secondary-color);
    line-height: 1.625;
  `,
  featuresSection: css`
    background-color: var(--blue-color-1);
    padding: 1.5rem 1rem;
  `,
  featuresGrid: css`
    display: grid;
    gap: 3rem;
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 4rem;
    }
  `,
  featuresTitle: css`
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--secondary-color);
  `,
  featuresDescription: css`
    font-size: 1.125rem;
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    line-height: 1.625;
  `,
  featuresList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
  featuresListItem: css`
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    svg {
      margin-right: 1rem;
      color: var(--primary-color);
    }
    span {
      color: var(--text-body);
    }
  `,
  featuresImageWrapper: css`
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  `,
  featuresImage: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  ctaSection: css`
    padding: 1.5rem 1rem;
    background-color: var(--secondary-color);
    color: white;
  `,
  ctaContainer: css`
    text-align: center;
    padding: 4rem 0;
  `,
  ctaHeading: css`
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    @media (min-width: 768px) {
      font-size: 2.25rem;
    }
  `,
  ctaText: css`
    font-size: 1.125rem;
    margin-bottom: 2rem;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.9;
  `,
  restaurantSection: css`
    background-color: white;
    padding: 1.5rem 1rem;
  `,
  restaurantContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
  `,
  errorContainer: css`
    text-align: center;
    padding: 2rem;
  `,
  errorMessage: css`
    font-size: 1.125rem;
    color: var(--text-secondary-1);
    margin-bottom: 1rem;
  `,
  retryButton: css`
    padding: 0.75rem 1.5rem;
  `
};
