/** @jsxImportSource @emotion/react */
import { EnvironmentOutlined, StarFilled } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Badge, Card, Carousel, Flex, Image, Tooltip, Typography } from 'antd';
import { DEFAULT_IMAGE } from '../constants/common.constant.ts';
import { PRICE_LEVEL } from '../constants/price.constants.ts';
import type { Restaurant } from '../types/restaurant';
import { formatScorePercentage } from '../utils/common.ts';
import PriceLevelTag from './PriceLevelTag.tsx';
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
>;

const RestaurantCard = ({
  restaurantName,
  restaurantRating,
  address,
  priceLevel,
  distance,
  avatarUrl,
  score,
  onClick
}: RestaurantCardProps & { onClick?: () => void }) => {
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
    >
      <Card
        css={styles.card}
        cover={
          <Image.PreviewGroup>
            <Carousel
              arrows
              dotPosition='bottom'
              draggable
              css={styles.carousel}
            >
              <div>
                <Image
                  src={avatarUrl || DEFAULT_IMAGE}
                  alt={restaurantName || 'Restaurant image'}
                  width='100%'
                  height={200}
                  placeholder
                  fallback={DEFAULT_IMAGE}
                />
              </div>
            </Carousel>
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

          <Flex justify='space-between' align='center'>
            <Tooltip title={priceConfig.tooltip} placement='bottom'>
              <Text strong>
                <PriceLevelTag text={priceConfig.text} />
              </Text>
            </Tooltip>
            <Flex align='center' gap={4}>
              <EnvironmentOutlined css={styles.distanceText} />
              <Text css={styles.distanceText}>
                {distance != null ? `${distance} km` : 'N/A'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Badge.Ribbon>
  );
};

export default RestaurantCard;

const styles = {
  card: css`
    position: relative;
    border-radius: 8px;
    box-shadow: none;
    cursor: pointer;
    padding: 0;
  `,
  carousel: css`
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    width: 100%;
  `,
  contentWrapper: css`
    cursor: pointer;
    padding: 0;
    gap: 0.5rem;
  `,
  ratingContainer: css`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 8px;

    @media (max-width: 768px) {
      gap: 4px;
    }
  `,
  ratingIcon: css`
    font-size: 14px;
    color: var(--yellow-color-6);

    @media (max-width: 480px) {
      font-size: 12px;
    }
  `,
  ratingText: css`
    color: var(--yellow-color-6);
    white-space: nowrap;

    @media (max-width: 480px) {
      font-size: 12px;
    }
  `,
  distanceText: css`
    color: var(--grey-color-4);
  `
};
