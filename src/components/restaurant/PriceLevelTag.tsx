/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TagOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { Styles } from '../../types/utility';

const styles: Styles = {
  priceLevelIcon: css`
    font-size: 0.9rem;
    color: var(--text-inactive);
  `,
  priceLevelText: css`
    font-weight: 400;
    font-size: 0.875rem;
    color: var(--text-inactive);
  `
};

interface PriceLevelTagProps {
  text: string;
}

export default function PriceLevelTag(props: PriceLevelTagProps) {
  const { text } = props;
  return (
    <Flex align='center' gap={8}>
      <TagOutlined css={styles.priceLevelIcon} />
      <Typography.Text css={styles.priceLevelText}>{text}</Typography.Text>
    </Flex>
  );
}
