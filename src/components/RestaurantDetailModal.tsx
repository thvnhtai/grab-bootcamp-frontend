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
  Image,
  List,
  Modal,
  Rate,
  Row,
  Space,
  Typography
} from 'antd';
import { DEFAULT_IMAGE } from '../constants/common.constant';
import { PRICE_LEVEL } from '../constants/price.constants';
import { Restaurant } from '../types/restaurant';
import { formatPrice } from '../utils/common';
import { Button } from './Button';
import PriceLevelTag from './PriceLevelTag';

interface DetailModalProps {
  data: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
}

const { Title, Text, Paragraph } = Typography;

const RestaurantDetailModal = ({ data, isOpen, onClose }: DetailModalProps) => {
  if (!data) return null;

  const {
    restaurantName,
    averageRating,
    priceLevel,
    matchScore,
    address,
    openingHours,
    restaurantDescription,
    mapUrl,
    menuItems,
    customerReviews,
    imageUrl
  } = data;

  const priceConfig = PRICE_LEVEL[priceLevel as keyof typeof PRICE_LEVEL] ?? {
    text: 'N/A',
    tooltip: ''
  };

  const handleOpenMap = (url: string) => () => {
    window.open(url, '_blank');
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={
        <Flex gap={16}>
          <Button
            onClick={onClose}
            variant='outlined'
            css={styles.fullWidthButton}
          >
            Close
          </Button>
          <Button
            onClick={mapUrl ? handleOpenMap(mapUrl) : undefined}
            disabled={!mapUrl}
            variant='solid'
            title='Open map in new tab'
            icon={<EnvironmentOutlined />}
            css={styles.fullWidthButton}
          >
            View on Map
          </Button>
        </Flex>
      }
      centered
      width={600}
    >
      <div css={styles.modalContent}>
        {/* Header Image */}
        <Badge.Ribbon
          text={`${matchScore ?? 0}% match`}
          color='var(--primary-color)'
        >
          <section css={styles.headerImageContainer}>
            <Image
              src={imageUrl || DEFAULT_IMAGE}
              alt={restaurantName || 'Restaurant image'}
              css={styles.headerImage}
              placeholder
            />
          </section>
        </Badge.Ribbon>

        {/* Header Info */}
        <section css={styles.sectionContainer}>
          <div>
            <Title level={3}>{restaurantName || 'Unnamed Restaurant'}</Title>
            <Space align='center'>
              <Rate
                disabled
                defaultValue={averageRating ?? 0}
                allowHalf
                character={<StarFilled style={{ fontSize: '16px' }} />}
              />
              <Text type='secondary'>{averageRating?.toFixed(1) ?? 'N/A'}</Text>
              <Text type='secondary'>•</Text>
              <PriceLevelTag text={priceConfig.text} />
            </Space>
          </div>
        </section>

        {/* Location & Hours */}
        <section css={styles.sectionContainer}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Space align='start'>
                <EnvironmentOutlined css={styles.icon} />
                <div>
                  <Text strong>Location</Text>
                  <Paragraph type='secondary' style={{ marginBottom: 0 }}>
                    {address || 'No address provided'}
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
                    {openingHours || 'Not available'}
                  </Paragraph>
                </div>
              </Space>
            </Col>
          </Row>
        </section>

        {/* Description */}
        <section css={styles.sectionContainer}>
          <Title level={4}>About</Title>
          <Paragraph type='secondary'>
            {restaurantDescription || 'No description provided.'}
          </Paragraph>
        </section>

        <Divider />

        {/* Menu Highlights */}
        <section css={styles.sectionContainer}>
          <Title level={4}>Menu Highlights</Title>
          {menuItems && menuItems.length > 0 ? (
            <List
              itemLayout='horizontal'
              dataSource={menuItems}
              renderItem={(item, index) => (
                <List.Item key={item.itemName + index}>
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
                  <Text strong css={styles.menuItemPrice}>
                    {item.itemPrice != null
                      ? formatPrice(item.itemPrice)
                      : 'N/A'}
                  </Text>
                </List.Item>
              )}
            />
          ) : (
            <Text type='secondary'>No menu highlights available.</Text>
          )}
        </section>

        <Divider />

        {/* Reviews */}
        <section css={styles.sectionContainer}>
          <Title level={4}>Customer Reviews</Title>
          {customerReviews && customerReviews.length > 0 ? (
            <List
              itemLayout='vertical'
              dataSource={customerReviews}
              renderItem={(review, index) => (
                <List.Item key={review.reviewerName + index}>
                  <List.Item.Meta
                    title={
                      <Flex align='center' justify='space-between'>
                        <Title level={5}>
                          {review.reviewerName || 'Anonymous'}
                        </Title>
                        <Text type='secondary'>
                          {review.reviewDate || 'Unknown date'}
                        </Text>
                      </Flex>
                    }
                    description={
                      <Flex vertical gap={16}>
                        <Rate
                          disabled
                          defaultValue={review.reviewRating ?? 0}
                          allowHalf
                          character={<StarFilled />}
                        />
                        <Paragraph type='secondary'>
                          {review.reviewComment || 'No comment provided'}
                        </Paragraph>
                      </Flex>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Text type='secondary'>No customer customerReviews yet.</Text>
          )}
        </section>
      </div>
    </Modal>
  );
};

export default RestaurantDetailModal;

const styles = {
  modalContent: css`
    padding: 1.5rem;
    max-height: 90vh;
    overflow-y: hidden;
  `,
  headerImageContainer: css`
    position: relative;
    height: 16rem;
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 1rem;
    background-color: var(--bg-disabled);
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  headerImage: css`
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
  `,

  icon: css`
    font-size: 1.25rem;
    color: var(--text-secondary-1);
    margin-right: 0.5rem;
    margin-top: 0.35rem;
    flex-shrink: 0;
  `,
  sectionContainer: css`
    margin-bottom: 1.5rem;
  `,
  menuItemPrice: css`
    font-weight: 500;
    white-space: nowrap;
    margin-left: 1rem;
  `,
  fullWidthButton: css`
    width: 100%;
    padding: 1.2rem;
  `
};
