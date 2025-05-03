/** @jsxImportSource @emotion/react */
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  StarFilled
} from '@ant-design/icons';
import { css } from '@emotion/react';
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
import { fetchPaginatedData } from '../services/restaurant.service';
import { MenuItem, Restaurant, Review } from '../types/restaurant';
import { formatScorePercentage } from '../utils/common';
import { Button } from './Button';
import PriceLevelTag from './PriceLevelTag';

const { Title, Text, Paragraph } = Typography;

interface Props {
  data: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
}

const RestaurantDetailModal = ({ data, isOpen, onClose, isLoading }: Props) => {
  const [menuPage, setMenuPage] = useState(1);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [menuLoading, setMenuLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [customerReviews, setCustomerReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (data) {
      setMenuItems(data.menuItems || []);
      setCustomerReviews(data.customerReviews || []);
      setMenuPage(1);
      setReviewsPage(1);
    }
  }, [data]);

  const priceConfig = useMemo(
    () => ({
      text: data?.priceLevel
        ? (PRICE_LEVEL[data.priceLevel]?.text ?? 'N/A')
        : 'N/A',
      tooltip: data?.priceLevel
        ? (PRICE_LEVEL[data.priceLevel]?.tooltip ?? '')
        : ''
    }),
    [data?.priceLevel]
  );

  const handleOpenMap = useCallback(
    (url?: string) => () => {
      if (url) window.open(url, '_blank');
    },
    []
  );

  const handleMenuPageChange = useCallback(
    async (page: number) => {
      if (!data?.restaurantId || !data?.dishesPagination) return;

      setMenuLoading(true);
      try {
        const response = await fetchPaginatedData(
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
      if (!data?.restaurantId || !data?.reviewsPagination) return;

      setReviewsLoading(true);
      try {
        const response = await fetchPaginatedData(
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
          <Spin size='large' />
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
    >
      <div css={styles.content}>
        <Badge.Ribbon
          text={`${formatScorePercentage(data.score)}% match`}
          color='var(--primary-color)'
        >
          <section css={styles.imageContainer}>
            <img
              src={data.avatarUrl || DEFAULT_IMAGE}
              alt={data.restaurantName || 'Restaurant'}
              css={styles.image}
            />
          </section>
        </Badge.Ribbon>

        <div css={styles.sections}>
          <section css={styles.section}>
            <Title level={3}>
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
                    <Text type='secondary'>N/A km away</Text>
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

          <section css={styles.section}>
            <Title level={5}>About</Title>
            <Paragraph type='secondary'>
              {data.restaurantDescription || 'No description provided.'}
            </Paragraph>
          </section>

          <Divider />

          <section css={styles.section}>
            <Title level={5}>Menu Highlights</Title>
            {menuItems.length > 0 ? (
              <>
                <List
                  itemLayout='horizontal'
                  dataSource={menuItems}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<Text>{item.itemName || 'Unnamed Dish'}</Text>}
                        description={
                          item.itemDescription ? (
                            <Text type='secondary'>{item.itemDescription}</Text>
                          ) : (
                            <Text type='secondary'>No description</Text>
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

          <section css={styles.section}>
            <Title level={5}>
              Customer Reviews ({data.restaurantRatingCount ?? 0})
            </Title>
            {customerReviews.length > 0 ? (
              <>
                <List
                  itemLayout='vertical'
                  dataSource={customerReviews}
                  renderItem={(review) => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <Flex justify='space-between'>
                            <Text>{review.reviewUserName || 'Anonymous'}</Text>
                            <Text type='secondary'>
                              {review.reviewDate || 'Unknown date'}
                            </Text>
                          </Flex>
                        }
                        description={
                          <Flex vertical gap={16}>
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
                                rows: 2,
                                expandable: true,
                                symbol: 'View more'
                              }}
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

const styles = {
  content: css`
    padding: 1.5rem;
    max-height: 85vh;
  `,
  imageContainer: css`
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 1rem;
    background-color: var(--bg-disabled);
    height: 20rem;
  `,
  image: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  sections: css`
    overflow-y: auto;
    max-height: calc(85vh - 22rem);
    padding-right: 1rem;
  `,
  section: css`
    margin-bottom: 1.5rem;
  `,
  icon: css`
    font-size: 1.25rem;
    color: var(--text-secondary-1);
    margin-top: 0.35rem;
  `,
  price: css`
    font-weight: 500;
    margin-left: 1rem;
  `,
  button: css`
    width: 100%;
    padding: 1.2rem;
  `,
  pagination: css`
    margin-top: 1rem;
  `
};

export default RestaurantDetailModal;
