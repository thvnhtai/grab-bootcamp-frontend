/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';
// import RestaurantList from '../../components/RestaurantList';
// import { sampleData } from '../../constants/data.constant';

import { Styles } from '../../types/utility';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.8); }
  to { transform: scale(1); }
`;

const features = [
  'Discover authentic local food stalls within 10km',
  'Get detailed information about each stall including ratings, hours, and menus',
  'Filter results by distance, rating, and price range'
];

const styles: Styles = {
  main: css`
    position: relative;
  `,
  sectionBase: css`
    padding: 5rem 0;
    @media (max-width: 768px) {
      padding: 3rem 1rem;
    }
  `,
  container: css`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
  `,
  heroSection: css`
    position: relative;
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
  `,
  heroButtonIcon: css`
    margin-left: 0.5rem;
    height: 1.25rem;
    width: 1.25rem;
  `,
  howItWorksSection: css`
    background-color: white;
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
  `
};

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/search');
  };

  const steps = [
    {
      title: 'Upload',
      description:
        'Take a photo of a dish you love or upload an existing one from your gallery.'
    },
    {
      title: 'Analyze',
      description:
        'Our AI identifies the dish and understands what makes it unique.'
    },
    {
      title: 'Discover',
      description:
        'Get personalized recommendations for nearby restaurants serving similar dishes.'
    }
  ];

  return (
    <main css={[styles.main, styles.sectionBase]}>
      {/* Hero Section */}
      <section css={styles.heroSection}>
        <div css={styles.heroImageWrapper}>
          <img
            src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1974'
            alt='Restaurant Spread'
            css={styles.heroImage}
          />
          <div css={styles.heroOverlay} />
        </div>

        <div css={[styles.heroContent, styles.container]}>
          <div css={styles.heroTextWrapper}>
            <h1 css={styles.heroHeading}>
              Find Nearby Restaurant by Uploading a Dish Photo
            </h1>
            <p css={styles.heroDescription}>
              Craving a dish but don&apos;t know where to find it? Upload a
              photo and we&apos;ll recommend the best local restaurants serving
              similar dishes near you.
            </p>
            <Button
              variant='solid'
              css={styles.heroButton}
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRightOutlined css={styles.heroButtonIcon} />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section css={[styles.howItWorksSection, styles.sectionBase]}>
        <div css={styles.container}>
          <h2 css={styles.sectionTitle}>How It Works</h2>
          <div css={styles.stepsGrid}>
            {steps.map((step, index) => (
              <div
                key={step.title}
                css={[
                  styles.stepCard,
                  css`
                    animation-delay: ${index * 0.1}s;
                  `
                ]}
              >
                <div css={styles.stepNumber}>{index + 1}</div>
                <h3 css={styles.stepTitle}>{step.title}</h3>
                <p css={styles.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section css={[styles.featuresSection, styles.sectionBase]}>
        <div css={styles.container}>
          <div css={styles.featuresGrid}>
            <div>
              <h2 css={styles.featuresTitle}>
                Find Your Next Favorite Restaurant Spot
              </h2>
              <p css={styles.featuresDescription}>
                EateryFinder helps you discover authentic local eateries based
                on your food preferences. Whether you&apos;re a tourist
                exploring new cuisines or a local looking for hidden gems,
                we&apos;ve got you covered.
              </p>
              <ul css={styles.featuresList}>
                {features.map((text) => (
                  <li key={text} css={styles.featuresListItem}>
                    <CheckCircleFilled />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div css={styles.featuresImageWrapper}>
              <img
                src='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500'
                alt='Fresh food'
                css={styles.featuresImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section css={[styles.ctaSection, styles.sectionBase]}>
        <div css={[styles.container, styles.ctaContainer]}>
          <h2 css={styles.ctaHeading}>Popular Discoveries</h2>
          <p css={styles.ctaText}>
            Check out some of the most popular restaurants discovered by our
            users
          </p>
        </div>
      </section>

      {/* Restaurant Section */}
      <section css={[styles.restaurantSection, styles.sectionBase]}>
        <div css={styles.container}>
          {/* <RestaurantList data={sampleData} /> */}
        </div>
      </section>
    </main>
  );
}
