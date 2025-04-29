/** @jsxImportSource @emotion/react */
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  StarFilled
} from '@ant-design/icons';
import { css } from '@emotion/react';
import {
  Badge,
  Divider,
  Image,
  List,
  Modal,
  Rate,
  Space,
  Typography,
  Row,
  Col,
  Flex
} from 'antd';
import { PRICE_LEVEL } from '../constants/price.constants';
import { Food } from '../types/food';
import { formatPrice } from '../utils/common';
import { Button } from './Button';
import PriceLevelTag from './PriceLevelTag';

interface DetailModalProps {
  data: Food | null;
  isOpen: boolean;
  onClose: () => void;
}

const { Title, Text, Paragraph } = Typography;

const FoodDetailModal = ({ data, isOpen, onClose }: DetailModalProps) => {
  if (!data) return null;

  const priceConfig = PRICE_LEVEL[
    data.priceLevel as keyof typeof PRICE_LEVEL
  ] ?? {
    text: 'N/A',
    tooltip: ''
  };

  const handleOpenMap = (mapUrl: string) => () => {
    window.open(mapUrl, '_blank');
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={
        <Flex gap={16}>
          <Button
            onClick={onClose}
            variant='outlined'
            css={styles.fullWidthButton}
          >
            Close
          </Button>
          <Button
            onClick={handleOpenMap(data.mapUrl)}
            variant='solid'
            title='Open map in new tab'
            icon={<EnvironmentOutlined />}
            css={styles.fullWidthButton}
          >
            View on Map
          </Button>
        </Flex>
      }
      centered
      width={600}
    >
      <div css={styles.modalContent}>
        {/* Header Image */}
        <section css={styles.headerImageContainer}>
          <Badge
            count={`${data.compatibility}% match`}
            offset={[-50, 20]}
            color='green'
          >
            <Image
              src={
                'https://images.unsplash.com/photo-1742241461508-07dfb49187c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8'
              }
              alt={data.name}
              css={styles.headerImage}
              placeholder
            />
          </Badge>
        </section>

        {/* Header Info */}
        <section css={styles.sectionContainer}>
          <div>
            <Title level={3}>{data.name}</Title>
            <Space align='center'>
              <Rate
                disabled
                defaultValue={data.rating}
                allowHalf
                character={<StarFilled style={{ fontSize: '16px' }} />}
              />
              <Text type='secondary'>{data.rating.toFixed(1)}</Text>
              <Text type='secondary'>•</Text>
              <PriceLevelTag text={priceConfig.text} />
            </Space>
          </div>
        </section>

        {/* Location & Hours */}
        <section css={styles.sectionContainer}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Space align='start'>
                <EnvironmentOutlined css={styles.icon} />
                <div>
                  <Text strong>Location</Text>
                  <Paragraph type='secondary' style={{ marginBottom: 0 }}>
                    {data.address}
                  </Paragraph>
                  <Text type='secondary'>
                    {data.distance.toFixed(1)} km away
                  </Text>
                </div>
              </Space>
            </Col>
            <Col xs={24} sm={12}>
              <Space align='start'>
                <ClockCircleOutlined css={styles.icon} />
                <div>
                  <Text strong>Opening Hours</Text>
                  <Paragraph type='secondary' style={{ marginBottom: 0 }}>
                    {data.hours}
                  </Paragraph>
                </div>
              </Space>
            </Col>
          </Row>
        </section>

        {/* Description */}
        <section css={styles.sectionContainer}>
          <Title level={4}>About</Title>
          <Paragraph type='secondary'>{data.description}</Paragraph>
        </section>

        <Divider />

        {/* Menu Highlights*/}
        <section css={styles.sectionContainer}>
          <Title level={4}>Menu Highlights</Title>
          <List
            itemLayout='horizontal'
            dataSource={data.menu}
            renderItem={(item, index) => (
              <List.Item key={item.name + index}>
                <List.Item.Meta
                  title={<Text>{item.name}</Text>}
                  description={
                    item.description ? (
                      <Text type='secondary'>{item.description}</Text>
                    ) : null
                  }
                />
                <Text strong css={styles.menuItemPrice}>
                  {formatPrice(item.price)}
                </Text>
              </List.Item>
            )}
          />
        </section>

        <Divider />

        {/* Reviews */}
        <section css={styles.sectionContainer}>
          <Title level={4}>Customer Reviews</Title>
          <List
            itemLayout='vertical'
            dataSource={data.reviews}
            renderItem={(review, index) => (
              <List.Item key={review.author + index}>
                <List.Item.Meta
                  title={
                    <Flex align='center' justify='space-between'>
                      <Title level={5}>{review.author}</Title>
                      <Text type='secondary'>{review.date}</Text>
                    </Flex>
                  }
                  description={
                    <Flex vertical gap={16}>
                      <Rate
                        disabled
                        defaultValue={review.rating}
                        allowHalf
                        character={<StarFilled />}
                      />
                      <Paragraph type='secondary'>{review.comment}</Paragraph>
                    </Flex>
                  }
                />
              </List.Item>
            )}
          />
        </section>
      </div>
    </Modal>
  );
};

export default FoodDetailModal;

const styles = {
  modalContent: css`
    padding: 1.5rem;
    max-height: 90vh;
    overflow-y: hidden;
  `,
  headerImageContainer: css`
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 1rem;
    background-color: var(--bg-disabled);
  `,
  headerImage: css`
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  `,
  icon: css`
    font-size: 1.25rem;
    color: var(--text-secondary-1);
    margin-right: 0.5rem;
    margin-top: 0.35rem;
    flex-shrink: 0;
  `,
  sectionContainer: css`
    margin-bottom: 1.5rem;
  `,
  menuItemPrice: css`
    font-weight: 500;
    white-space: nowrap;
    margin-left: 1rem;
  `,
  fullWidthButton: css`
    width: 100%;
    padding: 1.2rem;
  `
};
