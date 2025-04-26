/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

export function BaseLayout() {
  return (
    <div aria-label='base-layout' css={rootStyles}>
      <Outlet />
    </div>
  );
}

const rootStyles = css`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
