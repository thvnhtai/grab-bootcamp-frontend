/** @jsxImportSource @emotion/react */
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  ReloadOutlined
} from '@ant-design/icons';
import { Button as AntButton, Spin } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';
import RestaurantDetailModal from '../../components/RestaurantDetailModal';
import RestaurantList from '../../components/RestaurantList';
import { useRestaurant } from '../../hooks/useRestaurant';
import { Restaurant } from '../../types/restaurant';
import { getStepCardAnimation, styles } from './HomePage.styles';

const MAX_RESTAURANTS = 20;

const FEATURES = [
  'Discover authentic local food stalls within 10km',
  'Get detailed information about each stall including ratings, hours, and menus',
  'Filter results by distance, rating, and price range'
];

const STEPS = [
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

const HomePage = () => {
  const navigate = useNavigate();
  const {
    recommendedRestaurants,
    isLoading,
    isDetailLoading,
    error,
    fetchRecommendations,
    fetchDetails,
    logRestaurantClick,
    getUserCoordinates
  } = useRestaurant();

  const [state, setState] = useState<{
    isModalOpen: boolean;
    selectedRestaurant: Restaurant | null;
    modalRestaurantDetails: Restaurant | null;
    hasFetchedRecommendations: boolean;
  }>({
    isModalOpen: false,
    selectedRestaurant: null,
    modalRestaurantDetails: null,
    hasFetchedRecommendations: false
  });

  const restaurantSectionRef = useRef<HTMLElement>(null);

  const handleGetStarted = useCallback(() => {
    navigate('/search');
  }, [navigate]);

  const fetchRecommendationsWithCoords = useCallback(async () => {
    try {
      const coords = await getUserCoordinates();
      await fetchRecommendations(MAX_RESTAURANTS, coords);
      setState((prev) => ({ ...prev, hasFetchedRecommendations: true }));
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
      setState((prev) => ({ ...prev, hasFetchedRecommendations: true }));
    }
  }, [fetchRecommendations, getUserCoordinates]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !state.hasFetchedRecommendations) {
          fetchRecommendationsWithCoords();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = restaurantSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [state.hasFetchedRecommendations, fetchRecommendationsWithCoords]);

  useEffect(() => {
    if (state.isModalOpen && state.selectedRestaurant?.restaurantId) {
      fetchDetails(state.selectedRestaurant).then((details) => {
        setState((prev) => ({ ...prev, modalRestaurantDetails: details }));
        if (details?.restaurantId) {
          logRestaurantClick(details.restaurantId);
        }
      });
    } else if (!state.isModalOpen) {
      setState((prev) => ({
        ...prev,
        selectedRestaurant: null,
        modalRestaurantDetails: null
      }));
    }
  }, [
    state.isModalOpen,
    state.selectedRestaurant,
    fetchDetails,
    logRestaurantClick
  ]);

  const handleItemClick = useCallback((restaurant: Restaurant) => {
    if (restaurant.restaurantId) {
      setState((prev) => ({
        ...prev,
        selectedRestaurant: restaurant,
        isModalOpen: true
      }));
    } else {
      console.warn('Clicked restaurant has no ID:', restaurant);
    }
  }, []);

  const handleModalClose = useCallback(() => {
    setState((prev) => ({ ...prev, isModalOpen: false }));
  }, []);

  const handleRetryFetch = useCallback(() => {
    setState((prev) => ({ ...prev, hasFetchedRecommendations: false }));
    fetchRecommendationsWithCoords();
  }, [fetchRecommendationsWithCoords]);

  return (
    <main css={styles.main}>
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
              Craving a dish but don't know where to find it? Upload a photo and
              we'll recommend the best local restaurants serving similar dishes
              near you.
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

      <section css={styles.howItWorksSection}>
        <div css={styles.container}>
          <h2 css={styles.sectionTitle}>How It Works</h2>
          <div css={styles.stepsGrid}>
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                css={[styles.stepCard, getStepCardAnimation(index)]}
              >
                <div css={styles.stepNumber}>{index + 1}</div>
                <h3 css={styles.stepTitle}>{step.title}</h3>
                <p css={styles.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section css={styles.featuresSection}>
        <div css={styles.container}>
          <div css={styles.featuresGrid}>
            <div>
              <h2 css={styles.featuresTitle}>
                Find Your Next Favorite Restaurant Spot
              </h2>
              <p css={styles.featuresDescription}>
                EateryFinder helps you discover authentic local eateries based
                on your food preferences. Whether you're a tourist exploring new
                cuisines or a local looking for hidden gems, we've got you
                covered.
              </p>
              <ul css={styles.featuresList}>
                {FEATURES.map((text) => (
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

      <section css={styles.ctaSection}>
        <div css={[styles.container, styles.ctaContainer]}>
          <h2 css={styles.ctaHeading}>Popular Discoveries</h2>
          <p css={styles.ctaText}>
            Check out some of the most popular restaurants discovered by our
            users
          </p>
        </div>
      </section>

      <section css={styles.restaurantSection} ref={restaurantSectionRef}>
        <div css={[styles.container, styles.restaurantContainer]}>
          {isLoading ? (
            <Spin size='large' tip='Loading recommendations...' />
          ) : error ? (
            <div css={styles.errorContainer}>
              <p css={styles.errorMessage}>
                Failed to load recommendations. Please try again.
              </p>
              <AntButton
                type='primary'
                icon={<ReloadOutlined />}
                css={styles.retryButton}
                onClick={handleRetryFetch}
              >
                Retry
              </AntButton>
            </div>
          ) : recommendedRestaurants.length > 0 ? (
            <RestaurantList
              data={recommendedRestaurants}
              listLoading={isLoading}
              onItemClick={handleItemClick}
              xs={24}
              md={12}
              lg={8}
              xl={6}
            />
          ) : (
            state.hasFetchedRecommendations && (
              <p css={{ textAlign: 'center' }}>
                No recommended restaurants found.
              </p>
            )
          )}
        </div>
      </section>

      <RestaurantDetailModal
        data={state.modalRestaurantDetails}
        isOpen={state.isModalOpen}
        onClose={handleModalClose}
        isLoading={isDetailLoading}
      />
    </main>
  );
};

export default HomePage;
