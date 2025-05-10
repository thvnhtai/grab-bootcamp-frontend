/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Skeleton } from 'antd';

import RestaurantCard, { RestaurantCardProps } from './RestaurantCard';

import { Styles } from '../types/utility';

interface RestaurantCardSkeletonProps extends Partial<RestaurantCardProps> {
  loading?: boolean;
  onClick?: () => void;
}

const styles: Styles = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `,
  imageSkeleton: css`
    width: 100%;
    height: 10rem;
    border-radius: 8px 8px 0 0;
  `,
  titleSkeleton: css`
    width: 60%;
  `,
  ratingSkeleton: css`
    width: 20%;
  `,
  priceDistanceSkeleton: css`
    width: 30%;
  `
};

const RestaurantCardSkeleton = ({
  loading = true,
  onClick,
  ...props
}: RestaurantCardSkeletonProps) => {
  if (!loading) {
    return (
      <RestaurantCard {...(props as RestaurantCardProps)} onClick={onClick} />
    );
  }

  return (
    <div css={styles.container}>
      <Skeleton.Node active css={styles.imageSkeleton} />

      {/* Skeleton for title and rating */}
      <Flex justify='space-between' align='center'>
        <Skeleton.Button active size='small' css={styles.titleSkeleton} />
        <Skeleton.Button active size='small' css={styles.ratingSkeleton} />
      </Flex>

      {/* Skeleton for address/description */}
      <Skeleton
        active
        paragraph={{
          rows: 2,
          width: ['100%', '75%']
        }}
        title={false}
      />

      {/* Skeleton for price level and distance */}
      <Flex justify='space-between'>
        <Skeleton.Button
          active
          size='small'
          css={styles.priceDistanceSkeleton}
        />
        <Skeleton.Button
          active
          size='small'
          css={styles.priceDistanceSkeleton}
        />
      </Flex>
    </div>
  );
};

export default RestaurantCardSkeleton;
