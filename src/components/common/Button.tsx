/** @jsxImportSource @emotion/react */
import { darken, lighten } from 'polished';
import { Button as ButtonAnt, ButtonProps } from 'antd';

import { css } from '@emotion/react';

import { getCssVariableValue } from '../../utils/common';

interface ExtendedButtonProps extends ButtonProps {
  variant?: 'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link';
}

const buttonStyle = ({ type, variant }: { type: string; variant?: string }) => {
  const styleType = variant || type;
  const whiteColor = getCssVariableValue('--white-color');
  const borderColor = getCssVariableValue('--border-color');
  const bgSuccessColor = getCssVariableValue('--bg-success');
  const primaryColor = getCssVariableValue('--primary-color');
  const inactiveColor = getCssVariableValue('--text-inactive');
  const secondaryColor = getCssVariableValue('--text-secondary-2');

  switch (styleType) {
    case 'solid':
      return css`
        background: ${primaryColor};
        color: ${whiteColor};
        border: none;
        &:disabled {
          background: ${borderColor};
          color: ${inactiveColor};
          opacity: 0.6;
          &:hover,
          &:active {
            background: ${borderColor} !important;
            color: ${inactiveColor} !important;
            transform: none;
          }
        }
        &:hover {
          background: ${darken(0.05, primaryColor)} !important;
          color: ${whiteColor} !important;
        }
        &:active {
          background: ${darken(0.1, primaryColor)} !important;
          color: ${whiteColor} !important;
          transform: scale(0.98);
        }
      `;

    case 'outlined':
      return css`
        background: transparent;
        border: 1px solid ${borderColor} !important;
        color: ${inactiveColor} !important;
        &:disabled {
          opacity: 0.6;
          &:hover {
            background: transparent !important;
            border: 1px solid ${borderColor} !important;
            color: ${inactiveColor} !important;
          }
        }
        &:hover {
          background: ${primaryColor}10 !important;
          border: 1px solid ${primaryColor} !important;
          color: ${primaryColor} !important;
        }
      `;

    case 'dashed':
      return css`
        border: 1px dashed ${borderColor};
        color: ${inactiveColor};
        &:hover {
          border-color: ${primaryColor} !important;
          color: ${primaryColor} !important;
        }
        &:disabled:hover {
          border-color: ${borderColor} !important;
          color: ${inactiveColor} !important;
        }
      `;

    case 'text':
      return css`
        background: transparent !important;
        border: none !important;
        color: ${inactiveColor};
        box-shadow: none !important;
        &:disabled:hover {
          color: ${inactiveColor} !important;
          background: transparent !important;
        }
        &:hover {
          color: ${primaryColor} !important;
          background: ${primaryColor}10 !important;
        }
      `;

    case 'link':
      return css`
        background: transparent !important;
        border: none !important;
        color: ${secondaryColor};
        box-shadow: none !important;
        &:hover {
          color: ${lighten(0.3, secondaryColor)}!important;
          background: transparent !important;
        }
      `;

    case 'filled':
      return css`
        background: ${bgSuccessColor};
        color: ${primaryColor} !important;
        border: none;
        &:hover {
          background: ${darken(0.05, bgSuccessColor)} !important;
        }
      `;

    default:
      return css`
        background: ${whiteColor};
        color: ${inactiveColor};
        border: 1px solid ${borderColor};
        &:hover {
          border-color: ${primaryColor} !important;
          color: ${primaryColor} !important;
          background: ${primaryColor}10;
        }
      `;
  }
};

export default function Button(props: ExtendedButtonProps) {
  const { variant, type, ...rest } = props;

  return (
    <ButtonAnt css={buttonStyle({ type: type!, variant })} {...rest}>
      {props.children}
    </ButtonAnt>
  );
}
