/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Link } from 'react-router-dom';
import { Col, Empty, Flex, Row, Spin } from 'antd';

import { ArrowLeftOutlined } from '@ant-design/icons';

import { PageURLs } from '../../utils/navigate';
import useDebounce from '../../hooks/useDebounce';
import { styles } from './SearchResultPage.styles';
import Filters from '../../components/restaurant/Filters';
import { useRestaurant } from '../../hooks/useRestaurant';
import { transformerObject } from '../../redux/transformer';
import { Filters as FiltersType, Restaurant } from '../../types';
import { RestaurantDetailModal, RestaurantList } from '../../components';

const DEFAULT_FILTERS: FiltersType = {
  sortBy: 'score',
  minRating: 0,
  priceLevel: []
};

const SearchResultPage = () => {
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoadingInitialData, setIsLoadingInitialData] =
    useState<boolean>(true);
  const [currentFilters, setCurrentFilters] =
    useState<FiltersType>(DEFAULT_FILTERS);

  const { fetchDetails, logRestaurantClick, isDetailLoading } = useRestaurant();
  const debouncedFilters = useDebounce(currentFilters, 300);

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

  const computedRestaurants = useMemo(() => {
    let result = [...allRestaurants];

    if (debouncedFilters.minRating > 0) {
      result = result.filter(
        (r) => (r.restaurantRating ?? 0) >= debouncedFilters.minRating
      );
    }

    if (debouncedFilters.priceLevel && debouncedFilters.priceLevel.length > 0) {
      result = result.filter(
        (r) =>
          r.priceLevel !== undefined &&
          debouncedFilters.priceLevel?.includes(r.priceLevel)
      );
    }

    return result.sort((a, b) => {
      switch (debouncedFilters.sortBy) {
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
  }, [allRestaurants, debouncedFilters]);

  useEffect(() => {
    setFilteredRestaurants(computedRestaurants);
  }, [computedRestaurants]);

  const handleFilterChange = useCallback((filters: FiltersType) => {
    setCurrentFilters(filters);
  }, []);

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

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={6} xl={5} css={styles.filters}>
          {!isLoadingInitialData && (
            <Filters onFilterChange={handleFilterChange} />
          )}
        </Col>

        <Col xs={24} sm={24} md={16} lg={18} xl={19}>
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
              xs={24}
              sm={12}
              md={24}
              lg={12}
              xl={8}
              xxl={6}
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
