/** @jsxImportSource @emotion/react */
import { Divider, Flex, Skeleton } from 'antd';

import { css } from '@emotion/react';

import { Styles } from '../../types';
import RestaurantCard, { RestaurantCardProps } from './RestaurantCard';

const styles: Styles = {
  container: css`
    position: relative;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--border-color);
    background-color: white;
    overflow: hidden;
    height: 100%;
    min-height: 400px;
  `,
  contentWrapper: css`
    padding: 16px;
    padding-top: 8px;
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
  `,
  imageSkeleton: css`
    width: 100%;
    height: 200px;
    border-radius: 8px 8px 0 0;
  `,
  titleSkeleton: css`
    width: 100px;
    height: 20px;
  `,
  ratingSkeleton: css`
    width: 20%;
    height: 14px;
  `,
  addressSkeleton: css`
    width: 100%;
  `,
  priceSkeleton: css`
    width: 30%;
    height: 20px;
  `,
  distanceSkeleton: css`
    width: 20%;
    height: 14px;
  `,
  divider: css`
    margin-top: 8px;
    margin-bottom: 0;
  `
};

interface RestaurantCardSkeletonProps extends Partial<RestaurantCardProps> {
  loading?: boolean;
  onClick?: () => void;
}

export default function RestaurantCardSkeleton({
  loading = true,
  onClick,
  variant = 'full',
  ...rest
}: RestaurantCardSkeletonProps) {
  if (!loading) {
    return (
      <RestaurantCard
        {...(rest as RestaurantCardProps)}
        onClick={onClick}
        variant={variant}
      />
    );
  }

  const isFullVariant =
    variant === 'full' || rest.foodName || rest.foodPrice || rest.imgUrl;

  return (
    <div css={styles.container}>
      <Skeleton.Node
        active
        css={styles.imageSkeleton}
        style={{ width: 500, height: 200 }}
      />
      <div css={styles.contentWrapper}>
        {isFullVariant && (
          <>
            <Flex
              justify='space-between'
              align='center'
              style={{ minHeight: 40 }}
            >
              <Skeleton.Button
                active
                size='small'
                css={styles.titleSkeleton}
                style={{ width: 200 }}
              />
            </Flex>

            <Flex align='middle' justify='start' gap={16}>
              <Skeleton.Button active size='small' css={styles.priceSkeleton} />
              <Skeleton.Button active size='small' css={styles.priceSkeleton} />
            </Flex>

            <Divider css={styles.divider} />
          </>
        )}

        <Flex justify='space-between' align='center' style={{ minHeight: 40 }}>
          <Skeleton.Button
            active
            size='small'
            css={styles.titleSkeleton}
            style={{ width: 128 }}
          />
          <Skeleton.Button active size='small' css={styles.ratingSkeleton} />
        </Flex>

        <Skeleton
          active
          paragraph={{
            rows: 2,
            width: ['100%', '75%']
          }}
          title={false}
          style={{ minHeight: 40, marginBottom: 8 }}
        />

        {/* Skeleton for priceLevel (compact) and distance */}
        <Flex
          align='middle'
          justify={isFullVariant ? 'end' : 'space-between'}
          gap={8}
        >
          {!isFullVariant && (
            <Skeleton.Button active size='small' css={styles.priceSkeleton} />
          )}
          <Skeleton.Button active size='small' css={styles.distanceSkeleton} />
        </Flex>
      </div>
    </div>
  );
}
