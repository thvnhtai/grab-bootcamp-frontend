import { EnvironmentOutlined, StarFilled } from '@ant-design/icons';
import { Card, Carousel, Flex, Image, Typography } from 'antd';
import { formatPrice } from '../utils/common';

const { Text, Title, Paragraph } = Typography;

export interface FoodCardProps {
  title: string;
  rating: number;
  description: string;
  price: number;
  distance: string;
  images: string[];
}

const FoodCard = ({
  title,
  rating,
  description,
  price,
  distance,
  images
}: FoodCardProps) => {
  return (
    <Card
      style={{
        position: 'relative',
        borderRadius: 8,
        boxShadow: 'none',
        cursor: 'pointer',
        padding: 0
      }}
      bodyStyle={{ padding: 0, cursor: 'pointer' }}
      cover={
        <Image.PreviewGroup>
          <Carousel
            arrows
            dotPosition='bottom'
            draggable
            style={{
              borderRadius: '8px 8px 0 0',
              overflow: 'hidden',
              width: '100%'
            }}
          >
            {images.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt='food'
                  placeholder={true}
                  height={'10rem'}
                  width={'100%'}
                />
              </div>
            ))}
          </Carousel>
        </Image.PreviewGroup>
      }
    >
      <Flex vertical gap={'0.5rem'} style={{ padding: '1rem' }}>
        <Flex justify='space-between' align='center'>
          <Title style={{ margin: 0, fontSize: '14px' }}>{title}</Title>
          <Flex
            align='center'
            gap={4}
            style={{ color: 'var(--yellow-color-6)' }}
          >
            <StarFilled />
            <Text style={{ color: 'var(--yellow-color-6)' }}>{rating}</Text>
          </Flex>
        </Flex>
        <Paragraph
          type='secondary'
          ellipsis={{
            rows: 2,
            symbol: '...',
            tooltip: true
          }}
        >
          {description}
        </Paragraph>
        <Flex justify='space-between' align='center'>
          <Text strong>{formatPrice(price)}</Text>
          <Flex align='center' gap={4} style={{ color: 'var(--grey-color-4)' }}>
            <EnvironmentOutlined />
            <Text style={{ color: 'var(--grey-color-4)' }}>{distance}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default FoodCard;
