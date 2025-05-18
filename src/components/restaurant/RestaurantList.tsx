/** @jsxImportSource @emotion/react */
import { Col, ColProps, Row } from 'antd';

import { css } from '@emotion/react';

import { Restaurant, Styles } from '../../types';
import RestaurantCardSkeleton from './RestaurantCardSkeleton';

const SKELETON_COUNT = 6;

const styles: Styles = {
  container: css`
    width: 100%;
  `,
  col: css`
    display: flex;
    flex-direction: column;
    height: 100%;
  `
};

interface RestaurantListProps {
  data: Restaurant[];
  listLoading: boolean;
  xs?: ColProps['xs'];
  sm?: ColProps['sm'];
  md?: ColProps['md'];
  lg?: ColProps['lg'];
  xl?: ColProps['xl'];
  xxl?: ColProps['xxl'];
  onItemClick?: (item: Restaurant) => void;
  variant?: 'full' | 'compact';
}

export default function RestaurantList(props: RestaurantListProps) {
  const {
    data,
    listLoading,
    xs = 24,
    sm = 12,
    md = 8,
    lg = 6,
    xl = 6,
    xxl = 4,
    onItemClick,
    variant = 'full'
  } = props;

  if (listLoading) {
    return (
      <Row css={styles.container} gutter={[32, 32]}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <Col
            key={`skeleton-${index}`}
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            xxl={xxl}
          >
            <RestaurantCardSkeleton loading={true} variant={variant} />
          </Col>
        ))}
      </Row>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Row css={styles.container} gutter={[32, 32]}>
      {data.map((item) => (
        <Col
          key={item.restaurantId || `restaurant-${item.restaurantName}`}
          xs={xs}
          sm={sm}
          md={md}
          lg={lg}
          xl={xl}
          xxl={xxl}
          css={styles.col}
        >
          <RestaurantCardSkeleton
            loading={false}
            {...item}
            onClick={() => onItemClick?.(item)}
            variant={variant}
          />
        </Col>
      ))}
    </Row>
  );
}
