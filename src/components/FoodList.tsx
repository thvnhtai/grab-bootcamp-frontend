import { Col, Row } from 'antd';
import FoodCardSkeleton from './FoodCardSkeleton';

interface FoodListProps {
  data: Array<{
    id: number;
    title: string;
    rating: number;
    description: string;
    price: number;
    distance: string;
    images: string[];
  }>;
}

const FoodList = ({ data }: FoodListProps) => {
  return (
    <Row gutter={[32, 32]}>
      {data.map((item) => (
        <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
          <FoodCardSkeleton
            loading={!item}
            title={item.title}
            rating={item.rating}
            description={item.description}
            price={item.price}
            distance={item.distance}
            images={item.images}
          />
        </Col>
      ))}
    </Row>
  );
};

export default FoodList;
