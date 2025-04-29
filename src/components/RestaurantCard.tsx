/** @jsxImportSource @emotion/react */
import { EnvironmentOutlined, StarFilled } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Badge, Card, Carousel, Flex, Image, Tooltip, Typography } from 'antd';
import { DEFAULT_IMAGE } from '../constants/common.constant.ts';
import { PRICE_LEVEL } from '../constants/price.constants.ts';
import type { Restaurant } from '../types/restaurant';
import PriceLevelTag from './PriceLevelTag.tsx';
const { Text, Title, Paragraph } = Typography;

export type RestaurantCardProps = Pick<
  Restaurant,
  | 'restaurantName'
  | 'averageRating'
  | 'restaurantDescription'
  | 'priceLevel'
  | 'distance'
  | 'imageUrl'
  | 'matchScore'
>;

const RestaurantCard = ({
  restaurantName,
  averageRating,
  restaurantDescription,
  priceLevel,
  distance,
  imageUrl,
  matchScore,
  onClick
}: RestaurantCardProps & { onClick?: () => void }) => {
  const priceConfig = PRICE_LEVEL[priceLevel] || {
    text: 'N/A',
    tooltip: 'Price information unavailable'
  };

  return (
    <Badge.Ribbon
      text={matchScore != null ? `${matchScore}% match` : '0% match'}
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
                  src={imageUrl || DEFAULT_IMAGE}
                  alt={restaurantName || 'Restaurant image'}
                  placeholder
                  width='100%'
                />
              </div>
            </Carousel>
          </Image.PreviewGroup>
        }
        onClick={onClick}
      >
        <Flex vertical css={styles.contentWrapper}>
          <Flex justify='space-between' align='center'>
            <Title style={{ margin: 0, fontSize: '14px' }}>
              {restaurantName || 'Unnamed Restaurant'}
            </Title>
            <Flex align='center' gap={4}>
              <StarFilled css={styles.ratingText} />
              <Text css={styles.ratingText}>{averageRating ?? 0}</Text>
            </Flex>
          </Flex>

          <Paragraph
            type='secondary'
            ellipsis={{ rows: 2, symbol: '...', tooltip: true }}
          >
            {restaurantDescription || 'No description available.'}
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
  ratingText: css`
    color: var(--yellow-color-6);
  `,
  distanceText: css`
    color: var(--grey-color-4);
  `
};
