/** @jsxImportSource @emotion/react */
import { ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons';
import { css, keyframes } from '@emotion/react';
import { Button } from '../../components/Button';
import FoodList from '../../components/FoodList';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.8); }
  to { transform: scale(1); }
`;

const sampleData = [
  {
    id: 1,
    title: 'Salad Sensation',
    rating: 4.91,
    description:
      'Fresh, creative salads with house-made dressings. Options for vegan, keto, and other dietary preferences.',
    price: 100000,
    distance: '1.2 km',
    images: [
      'https://placehold.co/400x200',
      'https://placehold.co/600x400',
      'https://placehold.co/800x600'
    ]
  },
  {
    id: 2,
    title: 'Pho Paradise',
    rating: 4.75,
    description:
      'Traditional Vietnamese pho with rich broth, tender beef slices, and fresh herbs.',
    price: 60000,
    distance: '0.8 km',
    images: [
      'https://placehold.co/400x200',
      'https://placehold.co/600x400',
      'https://placehold.co/800x600'
    ]
  },
  {
    id: 3,
    title: 'Banh Mi Bros',
    rating: 4.82,
    description:
      'Crispy baguette with pork, pate, pickled veggies, and spicy mayo. Fast and flavorful.',
    price: 30000,
    distance: '1.5 km',
    images: [
      'https://placehold.co/400x200',
      'https://placehold.co/600x400',
      'https://placehold.co/800x600'
    ]
  },
  {
    id: 4,
    title: 'Sushi Street',
    rating: 4.88,
    description:
      'Fresh sushi and sashimi platters made to order. Great for quick bites or sushi fans.',
    price: 150000,
    distance: '2.3 km',
    images: [
      'https://placehold.co/400x200',
      'https://placehold.co/600x400',
      'https://placehold.co/800x600'
    ]
  },
  {
    id: 5,
    title: 'Vegan Vibes',
    rating: 4.95,
    description:
      '100% plant-based menu featuring burgers, noodles, and rice bowls. Eco-friendly packaging.',
    price: 90000,
    distance: '0.6 km',
    images: [
      'https://placehold.co/400x200',
      'https://placehold.co/600x400',
      'https://placehold.co/800x600'
    ]
  },
  {
    id: 6,
    title: 'Com Tam Corner',
    rating: 4.69,
    description:
      'Grilled pork, broken rice, and crispy egg served with classic fish sauce.',
    price: 45000,
    distance: '1.0 km',
    images: [
      'https://placehold.co/400x200',
      'https://placehold.co/600x400',
      'https://placehold.co/800x600'
    ]
  }
];

export default function HomePage() {
  return (
    <main css={mainStyle}>
      {/* Hero Section */}
      <section css={heroSection}>
        <div css={heroImageWrapper}>
          <img
            src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1974'
            alt='Food Spread'
            css={heroImage}
          />
          <div css={heroOverlay} />
        </div>

        <div css={heroContent}>
          <div css={heroTextWrapper}>
            <h1 css={heroHeading}>
              Find Nearby Food Stalls by Uploading a Dish Photo
            </h1>
            <p css={heroDescription}>
              Craving a dish but don't know where to find it? Upload a photo and
              we'll recommend the best local food stalls serving similar dishes
              near you.
            </p>
            <Button
              variant='solid'
              css={css`
                padding: 1.5rem;
                font-size: 1.125rem;
              `}
            >
              Get Started
              <ArrowRightOutlined
                css={css`
                  margin-left: 0.5rem;
                  height: 1.25rem;
                  width: 1.25rem;
                `}
              />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section css={howItWorksSection}>
        <div css={container}>
          <h2 css={sectionTitle}>How It Works</h2>
          <div css={stepsGrid}>
            {[1, 2, 3].map((step, index) => (
              <div
                key={step}
                css={[
                  stepCard,
                  css`
                    animation-delay: ${index * 0.1}s;
                  `
                ]}
              >
                <div css={stepNumber}>{step}</div>
                <h3 css={stepTitle}>
                  {['Upload', 'Analyze', 'Discover'][index]}
                </h3>
                <p css={stepDescription}>
                  {
                    [
                      'Take a photo of a dish you love or upload an existing one from your gallery.',
                      'Our AI identifies the dish and understands what makes it unique.',
                      'Get personalized recommendations for nearby food stalls serving similar dishes.'
                    ][index]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section css={featuresSection}>
        <div css={container}>
          <div css={featuresGrid}>
            <div>
              <h2 css={featuresTitle}>Find Your Next Favorite Food Spot</h2>
              <p css={featuresDescription}>
                EateryFinder helps you discover authentic local eateries based
                on your food preferences. Whether you're a tourist exploring new
                cuisines or a local looking for hidden gems, we've got you
                covered.
              </p>
              <ul css={featuresList}>
                {features.map((text, index) => (
                  <li key={index} css={featuresListItem}>
                    <CheckCircleFilled />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div css={featuresImageWrapper}>
              <img
                src='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500'
                alt='Fresh food'
                css={featuresImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section css={ctaSection}>
        <div css={[container, ctaContainer]}>
          <h2 css={ctaHeading}>Popular Discoveries</h2>
          <p css={ctaText}>
            Check out some of the most popular food stalls and restaurants
            discovered by our users
          </p>
          <Button variant='filled' css={ctaButton}>
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Food Section */}
      <section css={foodSection}>
        <div css={container}>
          <FoodList data={sampleData} />
        </div>
      </section>
    </main>
  );
}

const sectionBase = css`
  padding: 5rem 0;
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const container = css`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const mainStyle = css`
  position: relative;
`;

const heroSection = css`
  position: relative;
`;

const heroImageWrapper = css`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const heroImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const heroOverlay = css`
  position: absolute;
  inset: 0;
  background-color: rgba(54, 69, 115, 0.6);
`;

const heroContent = css`
  position: relative;
  z-index: 10;
  ${container}
  padding: 5rem 0;
  color: white;
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const heroTextWrapper = css`
  max-width: 36rem;
  animation: ${fadeIn} 1s ease-in;
`;

const heroHeading = css`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const heroDescription = css`
  font-size: 1.125rem;
  line-height: 1.75;
  margin-bottom: 2rem;
  opacity: 0.9;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const howItWorksSection = css`
  ${sectionBase}
  background-color: white;
`;

const stepsGrid = css`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(1, 1fr);
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const stepCard = css`
  text-align: center;
  animation: ${scaleIn} 0.3s ease-in;
  padding: 1.5rem;
`;

const stepNumber = css`
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
`;

const stepTitle = css`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--secondary-color);
`;

const stepDescription = css`
  color: var(--secondary-color);
  line-height: 1.625;
`;

const featuresSection = css`
  ${sectionBase}
  background-color: var(--blue-color-1);
`;

const featuresGrid = css`
  display: grid;
  gap: 3rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
  }
`;

const featuresTitle = css`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
`;

const featuresDescription = css`
  font-size: 1.125rem;
  color: var(--secondary-color);
  margin-bottom: 1.5rem;
  line-height: 1.625;
`;

const featuresList = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const featuresListItem = css`
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
`;

const featuresImageWrapper = css`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const featuresImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const sectionTitle = css`
  ${featuresTitle}
  text-align: center;
  margin-bottom: 3rem;
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const features = [
  'Discover authentic local food stalls within 10km',
  'Get detailed information about each stall including ratings, hours, and menus',
  'Filter results by distance, rating, and price range'
];

const ctaSection = css`
  ${sectionBase}
  padding: 3rem 2rem;
  background-color: var(--secondary-color);
  color: white;
`;

const ctaContainer = css`
  text-align: center;
  padding: 4rem 0;
`;

const ctaHeading = css`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const ctaText = css`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
`;

const ctaButton = css`
  font-size: 1.125rem;
  font-weight: 500;
  padding: 2rem 1.5rem;

  @media (min-width: 768px) {
    padding: 1.5rem 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1.2rem 1.5rem;
  }
`;

const foodSection = css`
  ${sectionBase}
  background-color: white;
`;
