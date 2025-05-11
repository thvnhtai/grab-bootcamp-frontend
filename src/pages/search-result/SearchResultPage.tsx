/** @jsxImportSource @emotion/react */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Empty, Flex, Row, Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Filters from '../../components/Filters';
import RestaurantDetailModal from '../../components/RestaurantDetailModal';
import RestaurantList from '../../components/RestaurantList';
import { transformerObject } from '../../redux/transformer';
import { useRestaurant } from '../../hooks/useRestaurant';
import { PageURLs } from '../../utils/navigate';
import { Filters as FiltersType, Restaurant } from '../../types/restaurant';
import { styles } from './SearchResultPage.styles';

const DEFAULT_FILTERS: FiltersType = {
  sortBy: 'score',
  minRating: 0,
  priceLevel: []
};

const SearchResultPage = () => {
  const { fetchDetails, logRestaurantClick, isDetailLoading } = useRestaurant();
  const [state, setState] = useState<{
    allRestaurants: Restaurant[];
    filteredRestaurants: Restaurant[];
    uploadedImage: string | null;
    selectedRestaurant: Restaurant | null;
    isModalOpen: boolean;
    isLoadingInitialData: boolean;
    currentFilters: FiltersType;
  }>({
    allRestaurants: [],
    filteredRestaurants: [],
    uploadedImage: null,
    selectedRestaurant: null,
    isModalOpen: false,
    isLoadingInitialData: true,
    currentFilters: DEFAULT_FILTERS
  });

  const {
    allRestaurants,
    filteredRestaurants,
    uploadedImage,
    selectedRestaurant,
    isModalOpen,
    isLoadingInitialData,
    currentFilters
  } = state;

  useEffect(() => {
    const storedResults = sessionStorage.getItem('searchResults');
    const storedImage = sessionStorage.getItem('uploadedImagePreview');

    if (storedResults) {
      try {
        const parsedRestaurants = JSON.parse(storedResults);
        const transformedRestaurants = transformerObject(parsedRestaurants);
        setState((prev) => ({
          ...prev,
          allRestaurants: transformedRestaurants,
          filteredRestaurants: transformedRestaurants
        }));
      } catch (error) {
        console.error('Failed to parse search results:', error);
        sessionStorage.removeItem('searchResults');
        sessionStorage.removeItem('uploadedImagePreview');
      }
    }
    if (storedImage) {
      setState((prev) => ({ ...prev, uploadedImage: storedImage }));
    }

    setState((prev) => ({ ...prev, isLoadingInitialData: false }));
  }, []);

  useEffect(() => {
    let result = [...allRestaurants];

    if (currentFilters.minRating > 0) {
      result = result.filter(
        (r) => (r.restaurantRating ?? 0) >= currentFilters.minRating
      );
    }

    if (currentFilters.priceLevel && currentFilters.priceLevel.length > 0) {
      result = result.filter(
        (r) =>
          r.priceLevel !== undefined &&
          currentFilters.priceLevel &&
          currentFilters.priceLevel.includes(r.priceLevel)
      );
    }

    result.sort((a, b) => {
      switch (currentFilters.sortBy) {
        case 'rating':
          return (b.restaurantRating ?? 0) - (a.restaurantRating ?? 0);
        case 'distance':
          if (a.distance == null && b.distance == null) return 0;
          if (a.distance == null) return 1;
          if (b.distance == null) return -1;
          return a.distance - b.distance;
        case 'score':
        default:
          return (b.score ?? 0) - (a.score ?? 0);
      }
    });

    setState((prev) => ({ ...prev, filteredRestaurants: result }));
  }, [allRestaurants, currentFilters]);

  const handleFilterChange = useCallback((filters: FiltersType) => {
    setState((prev) => ({ ...prev, currentFilters: filters }));
  }, []);

  const handleRestaurantClick = useCallback(
    async (restaurant: Restaurant) => {
      if (!restaurant.restaurantId) {
        console.warn('Attempted to click restaurant without ID:', restaurant);
        return;
      }

      logRestaurantClick(restaurant.restaurantId);

      try {
        const detailedRestaurant = await fetchDetails(restaurant);
        setState((prev) => ({
          ...prev,
          selectedRestaurant: detailedRestaurant,
          isModalOpen: true
        }));
      } catch (error) {
        console.error('Failed to load restaurant details:', error);
        setState((prev) => ({
          ...prev,
          selectedRestaurant: null,
          isModalOpen: false
        }));
      }
    },
    [fetchDetails, logRestaurantClick]
  );

  const handleModalClose = useCallback(() => {
    setState((prev) => ({ ...prev, isModalOpen: false }));
  }, []);

  const showEmptyState = !isLoadingInitialData && allRestaurants.length === 0;
  const showNoFilteredResults =
    !isLoadingInitialData &&
    allRestaurants.length > 0 &&
    filteredRestaurants.length === 0;
  const showResults = !isLoadingInitialData && filteredRestaurants.length > 0;

  return (
    <Flex vertical css={styles.container}>
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
        <Col xs={24} md={6} css={styles.filters}>
          {!isLoadingInitialData && (
            <Filters onFilterChange={handleFilterChange} />
          )}
        </Col>

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

      <RestaurantDetailModal
        data={selectedRestaurant}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        isLoading={isDetailLoading}
      />
    </Flex>
  );
};

export default SearchResultPage;
