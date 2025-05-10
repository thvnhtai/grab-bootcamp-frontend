/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TagOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';

import { Styles } from '../types/utility';

interface PriceLevelTagProps {
  text: string;
}

const styles: Styles = {
  priceLevelIcon: css`
    color: var(--text-inactive);
    font-size: 0.9rem;
  `,
  priceLevelText: css`
    color: var(--text-inactive);
    font-weight: 400;
    font-size: 0.875rem;
  `
};

const PriceLevelTag = ({ text }: PriceLevelTagProps) => (
  <Flex align='center' gap={8}>
    <TagOutlined css={styles.priceLevelIcon} />
    <Typography.Text css={styles.priceLevelText}>{text}</Typography.Text>
  </Flex>
);

export default PriceLevelTag;
