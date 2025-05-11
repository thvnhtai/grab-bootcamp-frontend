/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EnvironmentOutlined, StarFilled } from '@ant-design/icons';
import { Badge, Card, Col, Flex, Image, Row, Tooltip, Typography } from 'antd';

import { DEFAULT_IMAGE } from '../constants/common.constant';
import { PRICE_LEVEL } from '../constants/price.constants';
import { formatScorePercentage } from '../utils/common';

import PriceLevelTag from './PriceLevelTag';

import type { Restaurant } from '../types/restaurant';

import { Styles } from '../types/utility';

const { Text, Paragraph } = Typography;

export type RestaurantCardProps = Pick<
  Restaurant,
  | 'restaurantName'
  | 'restaurantRating'
  | 'address'
  | 'priceLevel'
  | 'distance'
  | 'avatarUrl'
  | 'score'
> & {
  onClick?: () => void;
};

const styles: Styles = {
  card: css`
    position: relative;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border-color);
    cursor: pointer;
    padding: 0;
    overflow: hidden;
    transition:
      transform 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  `,
  contentWrapper: css`
    cursor: pointer;
    padding: 0;
    gap: 0.5rem;
  `,
  ratingContainer: css`
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  `,
  ratingIcon: css`
    font-size: 0.75rem;
    color: var(--yellow-color-6);
  `,
  ratingText: css`
    color: var(--yellow-color-6);
    white-space: nowrap;
    font-size: 0.75rem;
  `,
  addressText: css`
    font-size: 0.75rem;
    color: var(--text-secondary-1);
  `,
  distanceIcon: css`
    font-size: 0.75rem;
    color: var(--text-secondary-1);
  `,
  distanceText: css`
    font-size: 0.75rem;
    color: var(--text-secondary);
    white-space: nowrap;
  `
};

const RestaurantCard = ({
  restaurantName,
  restaurantRating,
  address,
  priceLevel,
  distance,
  avatarUrl,
  score,
  onClick
}: RestaurantCardProps) => {
  const priceConfig = PRICE_LEVEL[priceLevel] || {
    text: 'N/A',
    tooltip: 'Price information unavailable'
  };

  return (
    <Badge.Ribbon
      text={
        score != null ? `${formatScorePercentage(score)} match` : '0% match'
      }
      color='var(--primary-color)'
      style={{
        display: score != null ? 'block' : 'none'
      }}
    >
      <Card
        css={styles.card}
        cover={
          <Image.PreviewGroup>
            <Image
              src={avatarUrl || DEFAULT_IMAGE}
              alt={restaurantName || 'Restaurant image'}
              width='100%'
              height={200}
              style={{
                objectFit: 'cover',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px'
              }}
              preview={false}
              fallback={DEFAULT_IMAGE}
            />
          </Image.PreviewGroup>
        }
        onClick={onClick}
      >
        <Flex vertical css={styles.contentWrapper}>
          <Flex justify='space-between' align='center' gap={4}>
            <Paragraph
              ellipsis={{ rows: 1, symbol: '...', tooltip: true }}
              style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}
            >
              {restaurantName || 'Unnamed Restaurant'}
            </Paragraph>
            <div css={styles.ratingContainer}>
              <StarFilled css={styles.ratingIcon} />
              <Text css={styles.ratingText}>
                {restaurantRating?.toFixed(1) ?? 0}
              </Text>
            </div>
          </Flex>

          <Paragraph
            type='secondary'
            ellipsis={{ rows: 2, symbol: '...', tooltip: true }}
          >
            {address || 'No description available.'}
          </Paragraph>

          <Row align='middle' justify='space-between' gutter={[8, 8]}>
            <Col>
              <Tooltip title={priceConfig.tooltip} placement='bottom'>
                <Text strong>
                  <PriceLevelTag text={priceConfig.text} />
                </Text>
              </Tooltip>
            </Col>
            <Col>
              <Flex align='center' gap={4}>
                <EnvironmentOutlined css={styles.distanceText} />
                <Text css={styles.distanceText}>
                  {distance != null ? `${distance} km` : 'N/A'}
                </Text>
              </Flex>
            </Col>
          </Row>
        </Flex>
      </Card>
    </Badge.Ribbon>
  );
};

export default RestaurantCard;
