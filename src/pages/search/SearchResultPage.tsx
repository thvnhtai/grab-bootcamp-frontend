/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Empty, Flex, Row, Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Filters from '../../components/Filters';
import RestaurantDetailModal from '../../components/RestaurantDetailModal';
import RestaurantList from '../../components/RestaurantList';

import { transformerObject } from '../../redux/transformer';
import { fetchRestaurantDetails } from '../../services/restaurant.service';
import { PageURLs } from '../../utils/navigate';

import { Filters as FiltersType, Restaurant } from '../../types/restaurant';
import { Styles } from '../../types/utility';

const styles: Styles = {
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
      top: 2rem;
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

const SearchResultPage = () => {
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [restaurantCache, setRestaurantCache] = useState<
    Record<string, Restaurant>
  >({});
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<FiltersType>({
    sortBy: 'score',
    minRating: 0,
    priceLevel: []
  });

  useEffect(() => {
    const storedResults = sessionStorage.getItem('searchResults');
    const storedImage = sessionStorage.getItem('uploadedImagePreview');

    if (storedResults) {
      try {
        const parsedRestaurants = JSON.parse(storedResults);
        const transformedRestaurants = transformerObject(parsedRestaurants);
        setAllRestaurants(transformedRestaurants);
      } catch (error) {
        console.error('Failed to parse search results:', error);
        sessionStorage.removeItem('searchResults');
        sessionStorage.removeItem('uploadedImagePreview');
      }
    }
    if (storedImage) {
      setUploadedImage(storedImage);
    }

    setIsLoadingInitialData(false);
  }, []);

  useEffect(() => {
    let result = [...allRestaurants];

    // Apply rating filter
    if (currentFilters.minRating > 0) {
      result = result.filter(
        (r) => (r.restaurantRating ?? 0) >= currentFilters.minRating
      );
    }

    // Apply price level filter
    if (currentFilters.priceLevel && currentFilters.priceLevel.length > 0) {
      result = result.filter(
        (r) =>
          r.priceLevel !== undefined &&
          currentFilters.priceLevel?.includes(r.priceLevel)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (currentFilters.sortBy) {
        case 'rating':
          return (b.restaurantRating ?? 0) - (a.restaurantRating ?? 0);
        case 'distance':
          return (a.distance ?? Infinity) - (b.distance ?? Infinity);
        case 'score':
        default:
          return (b.score ?? 0) - (a.score ?? 0);
      }
    });

    setFilteredRestaurants(result);
  }, [allRestaurants, currentFilters]);

  const handleFilterChange = useCallback((filters: FiltersType) => {
    setCurrentFilters(filters);
  }, []);

  const handleRestaurantClick = useCallback(
    async (restaurant: Restaurant) => {
      if (!restaurant.restaurantId) {
        console.warn('Attempted to click restaurant without ID:', restaurant);
        return;
      }

      const cached = restaurantCache[restaurant.restaurantId];
      if (cached) {
        setSelectedRestaurant(cached);
        setIsModalOpen(true);
        return;
      }

      setIsDetailLoading(true);
      setIsModalOpen(true);
      try {
        const detailedRestaurant = await fetchRestaurantDetails(restaurant);
        setRestaurantCache((prev) => ({
          ...prev,
          [restaurant.restaurantId]: detailedRestaurant
        }));
        setSelectedRestaurant(detailedRestaurant);
      } catch (error) {
        console.error('Failed to load restaurant details:', error);
        setSelectedRestaurant(null);
        setIsModalOpen(false);
      } finally {
        setIsDetailLoading(false);
      }
    },
    [restaurantCache]
  );

  const showEmptyState = !isLoadingInitialData && allRestaurants.length === 0;
  const showNoFilteredResults =
    !isLoadingInitialData &&
    allRestaurants.length > 0 &&
    filteredRestaurants.length === 0;
  const showResults = !isLoadingInitialData && filteredRestaurants.length > 0;

  return (
    <Flex vertical css={styles.container}>
      {/* Header */}
      <Flex align='center' justify='space-between' css={styles.header}>
        <Link to={PageURLs.ofSearch()} css={styles.backLink}>
          <ArrowLeftOutlined /> Back to Upload
        </Link>
        {uploadedImage && (
          <div css={styles.imagePreview}>
            <img
              src={uploadedImage}
              alt='Uploaded Food'
              css={styles.previewImage}
            />
          </div>
        )}
      </Flex>

      <Row gutter={[32, 16]}>
        {/* Filters Column */}
        <Col xs={24} md={6} css={styles.filters}>
          {!isLoadingInitialData && (
            <Filters onFilterChange={handleFilterChange} />
          )}
        </Col>

        {/* Restaurant List Column */}
        <Col xs={24} md={18}>
          {isLoadingInitialData && (
            <div css={styles.loading}>
              <Spin size='large' tip='Loading results...' />
            </div>
          )}

          {showEmptyState && (
            <div css={styles.empty}>
              <Empty description='No search results found. Please upload an image to search.' />
            </div>
          )}

          {showNoFilteredResults && (
            <div css={styles.empty}>
              <Empty description='No results found matching your criteria.' />
            </div>
          )}

          {showResults && (
            <RestaurantList
              data={filteredRestaurants}
              listLoading={isLoadingInitialData}
              md={12}
              lg={8}
              xl={6}
              onItemClick={handleRestaurantClick}
            />
          )}
        </Col>
      </Row>

      {/* Restaurant Detail Modal */}
      <RestaurantDetailModal
        data={selectedRestaurant}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isDetailLoading}
      />
    </Flex>
  );
};

export default SearchResultPage;
