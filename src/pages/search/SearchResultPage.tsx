/** @jsxImportSource @emotion/react */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Col, Empty, Flex, Row, Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Filters from '../../components/Filters';
import RestaurantDetailModal from '../../components/RestaurantDetailModal';
import RestaurantList from '../../components/RestaurantList';
import { fetchRestaurantDetails } from '../../services/restaurant.service';
import { Restaurant } from '../../types/restaurant';
import { PageURLs } from '../../utils/navigate';

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
  const [currentFilters, setCurrentFilters] = useState<Filters>({
    searchTerm: '',
    sortBy: 'score',
    minRating: 0
  });

  useEffect(() => {
    const storedResults = sessionStorage.getItem('searchResults');
    const storedImage = sessionStorage.getItem('uploadedImagePreview');

    if (storedResults) {
      try {
        const parsedRestaurants = JSON.parse(storedResults);
        setAllRestaurants(parsedRestaurants);
        setFilteredRestaurants(parsedRestaurants);
      } catch (error) {
        console.error('Failed to parse search results:', error);
        sessionStorage.removeItem('searchResults');
      }
    }
    if (storedImage) {
      setUploadedImage(storedImage);
    }
  }, []);

  const handleFilterChange = useCallback((filters: Filters) => {
    setCurrentFilters(filters);
  }, []);

  useEffect(() => {
    let result = [...allRestaurants];
    if (currentFilters.searchTerm) {
      const term = currentFilters.searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.restaurantName?.toLowerCase().includes(term) ||
          r.address?.toLowerCase().includes(term)
      );
    }

    if (currentFilters.minRating > 0) {
      result = result.filter(
        (r) => (r.restaurantRating ?? 0) >= currentFilters.minRating
      );
    }

    switch (currentFilters.sortBy) {
      case 'rating':
        result.sort(
          (a, b) => (b.restaurantRating ?? 0) - (a.restaurantRating ?? 0)
        );
        break;
      case 'distance':
        result.sort(
          (a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity)
        );
        break;
      case 'score':
      default:
        result.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
        break;
    }

    setFilteredRestaurants(result);
  }, [allRestaurants, currentFilters]);

  const handleRestaurantClick = useCallback(
    async (restaurant: Restaurant) => {
      const cached = restaurantCache[restaurant.restaurantId];
      if (cached) {
        setSelectedRestaurant(cached);
        setIsModalOpen(true);
        return;
      }

      setIsDetailLoading(true);
      try {
        const detailedRestaurant = await fetchRestaurantDetails(restaurant);
        setRestaurantCache((prev) => ({
          ...prev,
          [restaurant.restaurantId]: detailedRestaurant
        }));
        setSelectedRestaurant(detailedRestaurant);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Failed to load restaurant details:', error);
      } finally {
        setIsDetailLoading(false);
      }
    },
    [restaurantCache]
  );

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
          <Filters onFilterChange={handleFilterChange} />
        </Col>
        <Col xs={24} md={18}>
          {allRestaurants.length === 0 && !uploadedImage ? (
            <div css={styles.loading}>
              <Spin size='large' />
            </div>
          ) : (
            <RestaurantList
              data={filteredRestaurants}
              md={12}
              lg={8}
              xl={6}
              onItemClick={handleRestaurantClick}
            />
          )}
          {filteredRestaurants.length === 0 && allRestaurants.length > 0 && (
            <div css={styles.empty}>
              <Empty description='No results found matching your criteria.' />
            </div>
          )}
        </Col>
      </Row>

      <RestaurantDetailModal
        data={selectedRestaurant}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isDetailLoading}
      />
    </Flex>
  );
};

const styles = {
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
    color: var(--text-secondary);
    font-weight: 500;
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
    @media (min-width: 768px) {
      position: sticky;
      top: 6rem;
      align-self: flex-start;
    }
  `,
  loading: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
  `,
  empty: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
  `
};

export default SearchResultPage;
