/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import { useWindowSize } from '../hooks/useWindowSize';

export function BaseLayout() {
  const windowSize = useWindowSize();

  return (
    <div aria-label='base-layout' css={rootStyles(windowSize)}>
      <Outlet />
    </div>
  );
}

const rootStyles = (windowSize: RectSize) => css`
  --wd-width: ${windowSize.width / 10}rem;
  --wd-height: ${windowSize.height / 10}rem;
  --wd-w-px: ${windowSize.width / 10}rem;
  --wd-h-px: ${windowSize.height / 10}rem;
  --wd-ratio: ${windowSize.width / windowSize.height};
  width: 100%;
  min-height: var(--wd-h-px);
`;
