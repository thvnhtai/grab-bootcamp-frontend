import { Flex, Skeleton } from 'antd';
import FoodCard, { FoodCardProps } from './FoodCard';

interface FoodCardSkeletonProps extends FoodCardProps {
  loading?: boolean;
}

const FoodCardSkeleton = ({
  loading = true,
  ...props
}: FoodCardSkeletonProps) => {
  if (!loading) return <FoodCard {...props} />;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <Skeleton.Node
        active
        style={{ width: '100%', height: '10rem', borderRadius: '8px 8px 0 0' }}
      />
      <Flex justify='space-between' align='center'>
        <Skeleton.Button active size='small' style={{ width: 150 }} />
        <Skeleton.Button active size='small' style={{ width: 60 }} />
      </Flex>
      <Skeleton
        active
        paragraph={{
          rows: 2,
          width: ['100%', '75%']
        }}
        title={false}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton.Button active size='small' style={{ width: 120 }} />
        <Skeleton.Button active size='small' style={{ width: 60 }} />
      </div>
    </div>
  );
};

export default FoodCardSkeleton;
