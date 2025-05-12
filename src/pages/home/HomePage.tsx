/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons';

import { Restaurant, UserCoordinates } from '../../types';
import { useRestaurant } from '../../hooks/useRestaurant';
import { getStepCardAnimation, styles } from './HomePage.styles';
import {
  Button,
  RestaurantDetailModal,
  RestaurantList
} from '../../components';
import {
  FEATURES,
  MAX_RESTAURANTS,
  STEPS
} from '../../constants/common.constant';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [hasFetchedRecommendations, setHasFetchedRecommendations] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const {
    recommendedRestaurants,
    isLoading,
    isDetailLoading,
    fetchRecommendations,
    fetchDetails,
    logRestaurantClick,
    getUserCoordinates
  } = useRestaurant();

  const restaurantSectionRef = useRef<HTMLElement>(null);

  const handleGetStarted = useCallback(() => {
    navigate('/search');
  }, [navigate]);

  const handleRestaurantClick = useCallback((restaurant: Restaurant) => {
    if (!restaurant.restaurantId) {
      console.warn('Clicked restaurant has no ID:', restaurant);
      return;
    }
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const fetchRecommendationsWithCoords = useCallback(
    async (coords: UserCoordinates) => {
      try {
        await fetchRecommendations(MAX_RESTAURANTS, coords);
        setHasFetchedRecommendations(true);
      } catch (err) {
        console.error('Failed to fetch recommendations:', err);
        setHasFetchedRecommendations(false);
      }
    },
    [fetchRecommendations]
  );

  const fetchRecommendationsWithoutCoords = useCallback(async () => {
    try {
      await fetchRecommendations(MAX_RESTAURANTS);
      setHasFetchedRecommendations(true);
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
      setHasFetchedRecommendations(false);
    }
  }, [fetchRecommendations]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasFetchedRecommendations) {
          const coords = await getUserCoordinates();

          if (coords) {
            fetchRecommendationsWithCoords(coords);
          } else {
            fetchRecommendationsWithoutCoords();
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = restaurantSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    } else {
      console.warn('restaurantSectionRef is null');
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [
    hasFetchedRecommendations,
    fetchRecommendationsWithCoords,
    fetchRecommendationsWithoutCoords,
    getUserCoordinates
  ]);

  useEffect(() => {
    if (isModalOpen && selectedRestaurant?.restaurantId) {
      fetchDetails(selectedRestaurant).then((details) => {
        setSelectedRestaurant(details);
        if (details?.restaurantId) {
          logRestaurantClick(details.restaurantId);
        }
      });
    } else if (!isModalOpen) {
      setSelectedRestaurant(null);
    }
  }, [isModalOpen, selectedRestaurant, fetchDetails, logRestaurantClick]);

  return (
    <main css={styles.main}>
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
              Craving a dish but don’t know where to find it? Upload a photo and
              we’ll recommend the best local restaurants serving similar dishes
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

      {/* How It Works Section */}
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

      {/* Features Section */}
      <section css={styles.featuresSection}>
        <div css={styles.container}>
          <div css={styles.featuresGrid}>
            <div>
              <h2 css={styles.featuresTitle}>
                Find Your Next Favorite Restaurant Spot
              </h2>
              <p css={styles.featuresDescription}>
                EateryFinder helps you discover authentic local eateries based
                on your food preferences. Whether you’re a tourist exploring new
                cuisines or a local looking for hidden gems, we’ve got you
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

      {/* Call to Action Section */}
      <section css={styles.ctaSection}>
        <div css={[styles.container, styles.ctaContainer]}>
          <h2 css={styles.ctaHeading}>Popular Discoveries</h2>
          <p css={styles.ctaText}>
            Check out some of the most popular restaurants discovered by our
            users
          </p>
        </div>
      </section>

      {/* Restaurant List Section */}
      <section css={styles.restaurantSection} ref={restaurantSectionRef}>
        <div css={[styles.container, styles.restaurantContainer]}>
          <RestaurantList
            data={recommendedRestaurants}
            listLoading={isLoading}
            onItemClick={handleRestaurantClick}
            xs={24}
            md={12}
            lg={8}
            xl={6}
            variant='compact'
          />
        </div>
      </section>

      {/* Restaurant Detail Modal */}
      <RestaurantDetailModal
        data={selectedRestaurant}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        isLoading={isDetailLoading}
      />
    </main>
  );
};

export default HomePage;
