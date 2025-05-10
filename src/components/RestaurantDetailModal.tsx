/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  StarFilled
} from '@ant-design/icons';
import {
  Badge,
  Col,
  Divider,
  Flex,
  List,
  Modal,
  Pagination,
  Rate,
  Row,
  Space,
  Spin,
  Typography
} from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DEFAULT_IMAGE } from '../constants/common.constant';
import { PRICE_LEVEL } from '../constants/price.constants';
import { formatScorePercentage } from '../utils/common';
import { fetchPaginatedData } from '../services/restaurant.service';

import { Button } from './Button';
import PriceLevelTag from './PriceLevelTag';

import { MenuItem, Restaurant, Review } from '../types/restaurant';

import { Styles } from '../types/utility';

const { Title, Text, Paragraph } = Typography;

interface RestaurantDetailModalProps {
  data: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
}

const styles: Styles = {
  content: css`
    padding: 1.5rem;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
  `,
  imageContainer: css`
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 1rem;
    background-color: var(--bg-disabled);
    height: 20rem;
    width: 100%;
  `,
  image: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  badgeRibbon: css`
    .ant-ribbon-wrapper {
      top: 10px;
      right: 10px;
    }
  `,
  sections: css`
    flex-grow: 1;
    overflow-y: auto;
    padding-right: 1rem;
  `,
  section: css`
    margin-bottom: 1.5rem;
  `,
  restaurantTitle: css`
    margin-bottom: 0.5rem;
  `,
  sectionHeading: css`
    margin-bottom: 1rem;
  `,
  icon: css`
    font-size: 1.25rem;
    color: var(--text-secondary-1);
    margin-top: 0.35rem;
  `,
  price: css`
    font-weight: 500;
    margin-left: 1rem;
    flex-shrink: 0;
  `,
  button: css`
    flex: 1;
    min-width: 100px;
  `,
  pagination: css`
    margin-top: 1rem;
  `,
  reviewDate: css`
    font-size: 0.875rem;
  `,
  reviewText: css`
    font-size: 0.875rem;
  `
};

const RestaurantDetailModal = ({
  data,
  isOpen,
  onClose,
  isLoading
}: RestaurantDetailModalProps) => {
  const [menuPage, setMenuPage] = useState(1);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [menuLoading, setMenuLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [customerReviews, setCustomerReviews] = useState<Review[]>([]);

  const priceConfig = useMemo(
    () =>
      data?.priceLevel
        ? (PRICE_LEVEL[data.priceLevel] ?? { text: 'N/A', tooltip: '' })
        : { text: 'N/A', tooltip: '' },
    [data?.priceLevel]
  );

  useEffect(() => {
    if (data) {
      setMenuItems(data.menuItems || []);
      setCustomerReviews(data.customerReviews || []);
      setMenuPage(1);
      setReviewsPage(1);
    } else {
      setMenuItems([]);
      setCustomerReviews([]);
      setMenuPage(1);
      setReviewsPage(1);
    }
  }, [data]);

  const handleOpenMap = useCallback(
    (url?: string) => () => {
      if (url) window.open(url, '_blank');
    },
    []
  );

  const handleMenuPageChange = useCallback(
    async (page: number) => {
      if (!data?.restaurantId || !data?.dishesPagination) {
        console.warn(
          'Cannot fetch menu items: missing data or pagination info'
        );
        return;
      }

      setMenuLoading(true);
      try {
        const response = await fetchPaginatedData<MenuItem>(
          `restaurant/${data.restaurantId}/dishes`,
          page,
          data.dishesPagination.size
        );
        setMenuItems(response);
        setMenuPage(page);
      } catch (error) {
        console.error('Failed to load menu items:', error);
      } finally {
        setMenuLoading(false);
      }
    },
    [data]
  );

  const handleReviewsPageChange = useCallback(
    async (page: number) => {
      if (!data?.restaurantId || !data?.reviewsPagination) {
        console.warn('Cannot fetch reviews: missing data or pagination info');
        return;
      }

      setReviewsLoading(true);
      try {
        const response = await fetchPaginatedData<Review>(
          `restaurant/${data.restaurantId}/reviews`,
          page,
          data.reviewsPagination.size
        );
        setCustomerReviews(response);
        setReviewsPage(page);
      } catch (error) {
        console.error('Failed to load reviews:', error);
      } finally {
        setReviewsLoading(false);
      }
    },
    [data]
  );

  if (isLoading || !data) {
    return (
      <Modal open={isOpen} onCancel={onClose} footer={null} centered>
        <Flex justify='center' align='center' style={{ minHeight: 300 }}>
          <Spin
            size='large'
            tip={
              isLoading ? 'Loading restaurant details...' : 'Preparing modal...'
            }
          />
        </Flex>
      </Modal>
    );
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={
        <Flex gap={16}>
          <Button onClick={onClose} variant='outlined' css={styles.button}>
            Close
          </Button>
          <Button
            onClick={handleOpenMap(data.mapUrl)}
            disabled={!data.mapUrl}
            variant='solid'
            icon={<EnvironmentOutlined />}
            css={styles.button}
          >
            View on Map
          </Button>
        </Flex>
      }
      centered
      width={700}
      style={{ padding: 0 }}
    >
      <div css={styles.content}>
        {data.score != null ? (
          <Badge.Ribbon
            text={`${formatScorePercentage(data.score)}% match`}
            color='var(--primary-color)'
            css={styles.badgeRibbon}
          >
            <section css={styles.imageContainer}>
              <img
                src={data.avatarUrl || DEFAULT_IMAGE}
                alt={data.restaurantName || 'Restaurant'}
                css={styles.image}
              />
            </section>
          </Badge.Ribbon>
        ) : (
          <section css={styles.imageContainer}>
            <img
              src={data.avatarUrl || DEFAULT_IMAGE}
              alt={data.restaurantName || 'Restaurant'}
              css={styles.image}
            />
          </section>
        )}

        <div css={styles.sections}>
          {/* Basic Info Section */}
          <section css={styles.section}>
            <Title level={3} css={styles.restaurantTitle}>
              {data.restaurantName || 'Unnamed Restaurant'}
            </Title>
            <Flex gap={8} align='center'>
              <Rate
                disabled
                value={data.restaurantRating ?? 0}
                allowHalf
                character={<StarFilled style={{ fontSize: '16px' }} />}
              />
              <Text type='secondary'>
                {data.restaurantRating?.toFixed(1) ?? 'N/A'}
              </Text>
              <Text type='secondary'>•</Text>
              <PriceLevelTag text={priceConfig.text} />
            </Flex>
          </section>

          {/* Location and Hours Section */}
          <section css={styles.section}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Space align='start'>
                  <EnvironmentOutlined css={styles.icon} />
                  <div>
                    <Text strong>Location</Text>
                    <Paragraph type='secondary' style={{ marginBottom: 0 }}>
                      {data.address || 'No address provided'}
                    </Paragraph>
                    <Text type='secondary'>
                      {data.distance != null ? `${data.distance} km away` : ''}
                    </Text>
                  </div>
                </Space>
              </Col>
              <Col xs={24} sm={12}>
                <Space align='start'>
                  <ClockCircleOutlined css={styles.icon} />
                  <div>
                    <Text strong>Opening Hours</Text>
                    <Paragraph type='secondary' style={{ marginBottom: 0 }}>
                      {data.openingHours || 'Not available'}
                    </Paragraph>
                  </div>
                </Space>
              </Col>
            </Row>
          </section>

          {/* About Section */}
          <section css={styles.section}>
            <Title level={5} css={styles.sectionHeading}>
              About
            </Title>
            <Paragraph type='secondary'>
              {data.restaurantDescription || ''}
            </Paragraph>
          </section>

          <Divider />

          {/* Menu Section */}
          <section css={styles.section}>
            <Title level={5} css={styles.sectionHeading}>
              Menu Highlights
            </Title>
            {menuItems.length > 0 ? (
              <>
                <List
                  itemLayout='horizontal'
                  dataSource={menuItems}
                  renderItem={(item) => (
                    <List.Item key={item.itemName}>
                      <List.Item.Meta
                        title={<Text>{item.itemName || 'Unnamed Dish'}</Text>}
                        description={
                          item.itemDescription ? (
                            <Text type='secondary'>{item.itemDescription}</Text>
                          ) : (
                            ''
                          )
                        }
                      />
                      <Text type='secondary' css={styles.price}>
                        {item.itemPrice ?? 'N/A'}
                      </Text>
                    </List.Item>
                  )}
                  loading={menuLoading}
                />
                {data.dishesPagination &&
                  data.dishesPagination.total > data.dishesPagination.size && (
                    <Flex justify='center' css={styles.pagination}>
                      <Pagination
                        current={menuPage}
                        pageSize={data.dishesPagination.size}
                        total={data.dishesPagination.total}
                        onChange={handleMenuPageChange}
                        showSizeChanger={false}
                      />
                    </Flex>
                  )}
              </>
            ) : (
              <Text type='secondary'>No menu highlights available.</Text>
            )}
          </section>

          <Divider />

          {/* Reviews Section */}
          <section css={styles.section}>
            <Title level={5} css={styles.sectionHeading}>
              Customer Reviews ({data.restaurantRatingCount ?? 0})
            </Title>
            {customerReviews.length > 0 ? (
              <>
                <List
                  itemLayout='vertical'
                  dataSource={customerReviews}
                  renderItem={(review, index) => (
                    <List.Item key={review.reviewUserName || index}>
                      <List.Item.Meta
                        title={
                          <Flex justify='space-between' align='center'>
                            <Text strong>
                              {review.reviewUserName || 'Anonymous'}
                            </Text>
                            <Text type='secondary' css={styles.reviewDate}>
                              {review.reviewDate || 'Unknown date'}
                            </Text>
                          </Flex>
                        }
                        description={
                          <Flex vertical gap={8}>
                            <Rate
                              disabled
                              value={review.userRating ?? 0}
                              allowHalf
                              character={<StarFilled />}
                              style={{ fontSize: '1rem' }}
                            />
                            <Paragraph
                              type='secondary'
                              ellipsis={{
                                rows: 3,
                                expandable: true,
                                symbol: 'View more'
                              }}
                              css={styles.reviewText}
                            >
                              {review.userReview || 'No comment provided'}
                            </Paragraph>
                          </Flex>
                        }
                      />
                    </List.Item>
                  )}
                  loading={reviewsLoading}
                />
                {data.reviewsPagination &&
                  data.reviewsPagination.total >
                    data.reviewsPagination.size && (
                    <Flex justify='center' css={styles.pagination}>
                      <Pagination
                        current={reviewsPage}
                        pageSize={data.reviewsPagination.size}
                        total={data.reviewsPagination.total}
                        onChange={handleReviewsPageChange}
                        showSizeChanger={false}
                      />
                    </Flex>
                  )}
              </>
            ) : (
              <Text type='secondary'>No customer reviews yet.</Text>
            )}
          </section>
        </div>
      </div>
    </Modal>
  );
};

export default RestaurantDetailModal;
