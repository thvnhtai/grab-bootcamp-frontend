import type { ColProps } from 'antd';
import { Col, Row } from 'antd';
import type { Restaurant } from '../types/restaurant';
import RestaurantCardSkeleton from './RestaurantCardSkeleton';

interface RestaurantListProps {
  data: Restaurant[];
  xs?: ColProps['xs'];
  sm?: ColProps['sm'];
  md?: ColProps['md'];
  lg?: ColProps['lg'];
  xl?: ColProps['xl'];
}

const RestaurantList = ({
  data,
  xs = 24,
  sm = 12,
  md = 8,
  lg = 6,
  xl = 6,
  onItemClick
}: RestaurantListProps & { onItemClick?: (item: Restaurant) => void }) => {
  return (
    <Row gutter={[32, 32]}>
      {data.map((item, index) => (
        <Col
          key={item.restaurantId + index}
          xs={xs}
          sm={sm}
          md={md}
          lg={lg}
          xl={xl}
        >
          <RestaurantCardSkeleton
            loading={!item}
            {...item}
            onClick={() => onItemClick?.(item)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default RestaurantList;
