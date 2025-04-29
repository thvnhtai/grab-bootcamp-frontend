export const PRICE_LEVEL = {
  1: {
    text: 'Low',
    tooltip: 'Under 50,000 VND'
  },
  2: {
    text: 'Medium',
    tooltip: '50,000 - 150,000 VND'
  },
  3: {
    text: 'High',
    tooltip: 'Above 150,000 VND'
  }
} as const;

export type PriceLevelKey = keyof typeof PRICE_LEVEL;
