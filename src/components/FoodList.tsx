import type { ColProps } from 'antd';
import { Col, Row } from 'antd';
import type { Food } from '../types/food.d.ts';
import FoodCardSkeleton from './FoodCardSkeleton';

interface FoodListProps {
  data: Food[];
  xs?: ColProps['xs'];
  sm?: ColProps['sm'];
  md?: ColProps['md'];
  lg?: ColProps['lg'];
  xl?: ColProps['xl'];
}

const FoodList = ({
  data,
  xs = 24,
  sm = 12,
  md = 8,
  lg = 6,
  xl = 6,
  onItemClick
}: FoodListProps & { onItemClick?: (item: Food) => void }) => {
  return (
    <Row gutter={[32, 32]}>
      {data.map((item) => (
        <Col key={item.id} xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
          <FoodCardSkeleton
            loading={!item}
            {...item}
            onClick={() => onItemClick?.(item)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default FoodList;
