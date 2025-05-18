export const PRICE_LEVEL = {
  1: {
    text: '$',
    tooltip: 'Under 50,000 VND',
    textColor: 'var(--color-success)',
    bgColor: 'var(--bg-success)'
  },
  2: {
    text: '$$',
    tooltip: '50,000 - 150,000 VND',
    textColor: 'var(--color-info)',
    bgColor: 'var(--bg-info)'
  },
  3: {
    text: '$$$',
    tooltip: 'Above 150,000 VND',
    textColor: 'var(--color-error)',
    bgColor: 'var(--bg-error)'
  }
} as const;

export type PriceLevelKey = keyof typeof PRICE_LEVEL;
