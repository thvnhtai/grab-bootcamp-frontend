/** @jsxImportSource @emotion/react */
import { EnvironmentOutlined, StarFilled } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Badge, Card, Carousel, Flex, Image, Tooltip, Typography } from 'antd';
import { PRICE_LEVEL } from '../constants/price.constants.ts';
import type { Food } from '../types/food.d.ts';
import PriceLevelTag from './PriceLevelTag.tsx';
const { Text, Title, Paragraph } = Typography;

export type FoodCardProps = Pick<
  Food,
  | 'name'
  | 'rating'
  | 'description'
  | 'priceLevel'
  | 'distance'
  | 'imageUrl'
  | 'compatibility'
>;

const FoodCard = ({
  name,
  rating,
  description,
  priceLevel,
  distance,
  imageUrl,
  compatibility,
  onClick
}: FoodCardProps & { onClick?: () => void }) => {
  const priceConfig = PRICE_LEVEL[priceLevel] || {
    text: 'N/A',
    tooltip: ''
  };

  return (
    <Card
      css={styles.card}
      cover={
        <Image.PreviewGroup>
          <Carousel arrows dotPosition='bottom' draggable css={styles.carousel}>
            <div>
              <Badge
                count={`${compatibility}% match`}
                offset={[-50, 25]}
                color='var(--primary-color)'
              >
                <Image src={imageUrl} alt='food' placeholder width={'100%'} />
              </Badge>
            </div>
          </Carousel>
        </Image.PreviewGroup>
      }
      onClick={onClick}
    >
      <Flex vertical css={styles.contentWrapper}>
        <Flex justify='space-between' align='center'>
          <Title style={{ margin: 0, fontSize: '14px' }}>{name}</Title>
          <Flex align='center' gap={4}>
            <StarFilled css={styles.ratingText} />
            <Text css={styles.ratingText}>{rating}</Text>
          </Flex>
        </Flex>

        <Paragraph
          type='secondary'
          ellipsis={{ rows: 2, symbol: '...', tooltip: true }}
        >
          {description}
        </Paragraph>

        <Flex justify='space-between' align='center'>
          <Tooltip title={priceConfig.tooltip} placement='bottom'>
            <Text strong>
              <PriceLevelTag text={priceConfig.text} />
            </Text>
          </Tooltip>
          <Flex align='center' gap={4}>
            <EnvironmentOutlined css={styles.distanceText} />
            <Text css={styles.distanceText}>{`${distance} km`}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default FoodCard;

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
