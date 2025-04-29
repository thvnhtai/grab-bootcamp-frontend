/** @jsxImportSource @emotion/react */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Col, Empty, Flex, Row, Spin } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Filters from '../../components/Filters';
import FoodDetailModal from '../../components/FoodDetailModal';
import FoodList from '../../components/FoodList';
import { useAppSelector } from '../../redux/hooks';
import {
  selectFoodData,
  selectFoodLoading
} from '../../redux/slices/foodSlice';
import { Food } from '../../types/food';
import { PageURLs } from '../../utils/navigate';

export default function SearchResultPage() {
  const data = useAppSelector(selectFoodData);
  const isLoading = useSelector(selectFoodLoading);

  const location = useLocation();
  const uploadedImage = location.state?.uploadedImage;

  const handleFilterChange = (filters: {
    searchTerm: string;
    sortBy: string;
    minRating: number;
  }) => {
    console.log('Filters changed:', filters);
  };

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFoodClick = (food: Food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  return (
    <Flex vertical css={styles.pageContainer}>
      {/* Header Section */}
      <Flex
        align='center'
        justify='space-between'
        gap={16}
        css={styles.headerRow}
      >
        <Link to={PageURLs.ofSearch()} css={styles.backLink}>
          <ArrowLeftOutlined /> Back to Upload
        </Link>

        {uploadedImage && (
          <div css={styles.imagePreviewContainer}>
            <img
              src={uploadedImage}
              alt='Uploaded Food'
              css={styles.previewImage}
            />
          </div>
        )}
      </Flex>

      <Row gutter={[32, 16]}>
        {/* Filters Sidebar */}
        <Col xs={24} md={6} css={styles.filterContainer}>
          <Filters onFilterChange={handleFilterChange} />
        </Col>

        {/* Results Area */}
        <Col xs={24} md={18}>
          {isLoading ? (
            <div css={styles.spinnerContainer}>
              <Spin size='large' />
            </div>
          ) : data.length > 0 ? (
            <FoodList
              data={data}
              md={12}
              lg={8}
              xl={6}
              onItemClick={handleFoodClick}
            />
          ) : (
            <div css={styles.spinnerContainer}>
              <Empty description='No results found matching your criteria.' />
            </div>
          )}
        </Col>
      </Row>

      <FoodDetailModal
        data={selectedFood}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Flex>
  );
}

const styles = {
  pageContainer: css`
    min-height: 100vh;
    padding: 2rem 5%;
    background-color: var(--bg-primary);
  `,
  headerRow: css`
    margin-bottom: 1.5rem;
  `,
  imagePreviewContainer: css`
    width: 5rem;
    height: 5rem;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--bg-disabled);
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `,
  previewImage: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  backLink: css`
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    color: var(--text-secondary);
    font-weight: 500;
    &:hover {
      color: var(--primary-color);
    }
  `,
  filterContainer: css`
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
    background-color: var(--bg-primary);
    z-index: 1;

    @media (min-width: 768px) {
      position: sticky;
      top: 6rem;
      align-self: flex-start;
    }

    @media (max-width: 767px) {
      position: static;
      max-height: none;
      margin-bottom: 1rem;
    }
  `,
  spinnerContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
  `
};
