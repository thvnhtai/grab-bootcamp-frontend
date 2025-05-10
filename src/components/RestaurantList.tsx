/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Col, Row } from 'antd';
import type { ColProps } from 'antd';

import RestaurantCardSkeleton from './RestaurantCardSkeleton';

import type { Restaurant } from '../types/restaurant';
import { Styles } from '../types/utility';

interface RestaurantListProps {
  data: Restaurant[];
  listLoading: boolean;
  xs?: ColProps['xs'];
  sm?: ColProps['sm'];
  md?: ColProps['md'];
  lg?: ColProps['lg'];
  xl?: ColProps['xl'];
  onItemClick?: (item: Restaurant) => void;
}

const SKELETON_COUNT = 6;

const styles: Styles = {
  container: css`
    width: 100%;
  `
};

const RestaurantList = ({
  data,
  listLoading,
  xs = 24,
  sm = 12,
  md = 8,
  lg = 6,
  xl = 6,
  onItemClick
}: RestaurantListProps) => {
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
          >
            <RestaurantCardSkeleton loading={true} />
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
        >
          <RestaurantCardSkeleton
            loading={false}
            {...item}
            onClick={() => onItemClick?.(item)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default RestaurantList;
