/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';

import { Flex, Typography } from 'antd';

import { css } from '@emotion/react';
import { TagOutlined } from '@ant-design/icons';

import { Styles } from '../../types';

interface PriceLevelTagProps {
  text: string;
  textColor?: string;
  bgColor?: string;
}

export default function PriceLevelTag(props: PriceLevelTagProps) {
  const { text, textColor, bgColor } = props;

  const styles: Styles = useMemo(() => {
    return {
      container: css`
        padding: 0 0.5rem;
        border-radius: 0.25rem;
        border: 1px solid ${textColor ?? 'var(--border-color)'};
        background-color: ${bgColor ?? 'var(--white-color)'};
        &:hover {
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        transition: all 0.2s ease-in-out;
      `,
      priceLevelIcon: css`
        font-size: 0.75rem;
        color: ${textColor ?? 'var(--text-inactive)'};
      `,
      priceLevelText: css`
        font-weight: 400;
        font-size: 0.75rem;
        color: ${textColor ?? 'var(--text-inactive)'};
      `
    };
  }, [textColor, bgColor]);

  return (
    <Flex align='center' gap={8} css={styles.container}>
      <TagOutlined css={styles.priceLevelIcon} />
      <Typography.Text css={styles.priceLevelText}>{text}</Typography.Text>
    </Flex>
  );
}
