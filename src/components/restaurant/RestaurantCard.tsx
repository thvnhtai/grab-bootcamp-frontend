/** @jsxImportSource @emotion/react */
import {
  Badge,
  Card,
  Col,
  Divider,
  Flex,
  Image,
  Row,
  Tooltip,
  Typography
} from 'antd';

import { css } from '@emotion/react';
import {
  EnvironmentOutlined,
  ShopOutlined,
  StarFilled
} from '@ant-design/icons';

import PriceLevelTag from './PriceLevelTag';
import { Restaurant, Styles } from '../../types';
import { formatScorePercentage } from '../../utils/common';
import { PRICE_LEVEL } from '../../constants/price.constants';
import { DEFAULT_IMAGE } from '../../constants/common.constant';
import { useMemo } from 'react';

const { Text, Paragraph } = Typography;

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
    height: 100%;
  `,
  contentWrapper: css`
    cursor: pointer;
    padding: 0;
    gap: 0.5rem;
    height: 100%;
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
  restaurantNameIcon: css`
    font-size: 0.75rem;
    color: var(--text-secondary-1);
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
  `,
  foodPriceText: css`
    font-size: 0.875rem;
    color: var(--text-secondary);
    white-space: nowrap;
  `
};

export interface RestaurantCardProps
  extends Pick<
    Restaurant,
    | 'restaurantName'
    | 'restaurantRating'
    | 'address'
    | 'priceLevel'
    | 'distance'
    | 'avatarUrl'
    | 'score'
    | 'foodName'
    | 'foodPrice'
    | 'imgUrl'
  > {
  onClick?: () => void;
  variant?: 'full' | 'compact';
}

export default function RestaurantCard({
  restaurantName,
  restaurantRating,
  address,
  priceLevel,
  distance,
  score,
  foodName,
  foodPrice,
  imgUrl,
  avatarUrl,
  onClick,
  variant = 'full'
}: RestaurantCardProps) {
  const priceConfig = useMemo(
    () =>
      priceLevel
        ? PRICE_LEVEL[priceLevel]
        : {
            text: 'N/A',
            tooltip: 'N/A',
            bgColor: 'var(--white-color)',
            textColor: 'var(--text-inactive)'
          },
    [priceLevel]
  );

  const imageSrc = imgUrl || avatarUrl || DEFAULT_IMAGE;

  const isFullVariant = variant === 'full' || foodName || foodPrice || imgUrl;

  return (
    <Badge.Ribbon
      text={
        <Flex vertical align='center'>
          <Text style={{ fontSize: '10px', color: 'var(--text-white)' }}>
            Match
          </Text>
          <Text style={{ fontSize: '14px', color: 'var(--text-white)' }}>
            {score != null ? formatScorePercentage(score) : 'N/A'}
          </Text>
        </Flex>
      }
      color='var(--primary-color)'
      style={{
        display: score != null ? 'block' : 'none'
      }}
    >
      <Card
        css={[
          styles.card,
          css`
            min-height: ${isFullVariant ? '400px' : '360px'};
          `
        ]}
        cover={
          <Image.PreviewGroup>
            <Image
              src={imageSrc}
              alt={restaurantName || 'Restaurant image'}
              width='100%'
              height={200}
              style={{
                objectFit: 'fill',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px'
              }}
              preview={false}
              fallback={DEFAULT_IMAGE}
            />
          </Image.PreviewGroup>
        }
        onClick={onClick}
        styles={{
          body: { padding: 16, paddingTop: `${isFullVariant ? 8 : 16}` }
        }}
      >
        <Flex vertical css={styles.contentWrapper}>
          {isFullVariant && (
            <>
              <Flex
                justify='space-between'
                align='center'
                gap={16}
                style={{ minHeight: 40 }}
              >
                <Paragraph
                  ellipsis={{ rows: 2, symbol: '...', tooltip: true }}
                  style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}
                >
                  {foodName || 'Unnamed Food'}
                </Paragraph>
                <Text css={styles.foodPriceText}>
                  {foodPrice != null ? `${foodPrice}` : ''}
                </Text>
              </Flex>

              <Divider style={{ marginTop: 8, marginBottom: 0 }} />
            </>
          )}

          <Flex
            justify='space-between'
            align='center'
            gap={16}
            style={{ minHeight: 40 }}
          >
            <Flex align='center' gap={16}>
              {isFullVariant && (
                <ShopOutlined css={styles.restaurantNameIcon} />
              )}
              <Paragraph
                ellipsis={{ rows: 2, symbol: '...', tooltip: true }}
                style={{
                  margin: 0,
                  fontSize: isFullVariant ? '12px' : '14px',
                  fontWeight: isFullVariant ? 500 : 600
                }}
              >
                {restaurantName || 'Unnamed Restaurant'}
              </Paragraph>
            </Flex>

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
            style={{
              minHeight: 40,
              fontSize: '12px',
              marginBottom: 8
            }}
          >
            {address || 'No description available.'}
          </Paragraph>

          <Row align='middle' justify='space-between' gutter={[8, 8]}>
            <Col>
              <Tooltip title={priceConfig['tooltip']} placement='bottom'>
                <Text>
                  <PriceLevelTag
                    text={priceConfig['text']}
                    textColor={priceConfig['textColor']}
                    bgColor={priceConfig['bgColor']}
                  />
                </Text>
              </Tooltip>
            </Col>
            {distance !== null && (
              <Col>
                <Flex align='center' gap={4}>
                  <EnvironmentOutlined css={styles.distanceText} />
                  <Text css={styles.distanceText}>
                    {`${distance.toFixed(1)} km`}
                  </Text>
                </Flex>
              </Col>
            )}
          </Row>
        </Flex>
      </Card>
    </Badge.Ribbon>
  );
}
