/** @jsxImportSource @emotion/react */
import { TagOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Flex, Typography } from 'antd';
import { Styles } from '../types/common';

const { Text } = Typography;

const PriceLevelTag = ({ text }: { text: string }) => (
  <Flex align='center' gap={8}>
    <TagOutlined css={styles.priceLevelIcon} />
    <Text css={styles.priceLevelText}>{text}</Text>
  </Flex>
);

export default PriceLevelTag;

const styles: Styles = {
  priceLevelIcon: css`
    color: var(--text-inactive);
  `,
  priceLevelText: css`
    color: var(--text-inactive);
    font-weight: 500;
  `
};
