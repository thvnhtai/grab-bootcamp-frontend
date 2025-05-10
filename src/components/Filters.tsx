/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Collapse, Flex, Select, Slider, Typography } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from './Button';

import { PriceLevelKey } from '../constants/price.constants';
import { Filters as FiltersType, SortByOption } from '../types/restaurant';
import { Styles } from '../types/utility';

const { Panel } = Collapse;
const { Text } = Typography;

const SORT_OPTIONS = [
  { value: 'score' as const, label: 'Best Match' },
  { value: 'rating' as const, label: 'Highest Rating' },
  { value: 'distance' as const, label: 'Closest' }
];

const PRICE_LEVEL_OPTIONS = [
  { value: 1 as PriceLevelKey, label: '$ - Low' },
  { value: 2 as PriceLevelKey, label: '$$ - Medium' },
  { value: 3 as PriceLevelKey, label: '$$$ - High' }
];

const RATING_CONFIG = {
  MIN: 0,
  MAX: 5,
  STEP: 0.1
};

type FiltersProps = {
  onFilterChange: (filters: FiltersType) => void;
};

const styles: Styles = {
  wrapper: css`
    width: 100%;
    margin-bottom: 1rem;
  `,
  container: css``,
  label: css`
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary-1);
  `,
  select: css`
    width: 100%;
    min-width: 0;
  `,
  slider: css`
    margin: 0.5rem 0;
    width: 100%;
  `,
  resetButton: css`
    width: 100%;
    margin-top: 1rem;
    padding: 1.2rem;
  `
};

export default function Filters({ onFilterChange }: FiltersProps) {
  const [sortBy, setSortBy] = useState<SortByOption>('score');
  const [minRating, setMinRating] = useState(RATING_CONFIG.MIN);
  const [priceLevel, setPriceLevel] = useState<PriceLevelKey[]>([]);

  const filters = useMemo(
    () => ({ sortBy, minRating, priceLevel }),
    [sortBy, minRating, priceLevel]
  );

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleReset = useCallback(() => {
    setSortBy('score');
    setMinRating(RATING_CONFIG.MIN);
    setPriceLevel([]);
  }, []);

  return (
    <Collapse
      defaultActiveKey={['filters']}
      css={styles.wrapper}
      expandIconPosition='end'
    >
      <Panel
        header='Refine Your Search'
        key='filters'
        style={{ fontWeight: 600 }}
      >
        <div css={styles.container}>
          <Flex vertical gap={24}>
            {/* Sort By */}
            <Flex vertical gap={8}>
              <label htmlFor='sort-select' css={styles.label}>
                Sort results
              </label>
              <Select
                id='sort-select'
                aria-label='Sort by'
                value={sortBy}
                onChange={setSortBy}
                css={styles.select}
              >
                {SORT_OPTIONS.map(({ value, label }) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Flex>

            {/* Price Range */}
            <Flex vertical gap={8}>
              <label htmlFor='price-select' css={styles.label}>
                Price range (per meal)
              </label>
              <Select
                id='price-select'
                mode='multiple'
                value={priceLevel}
                onChange={setPriceLevel}
                placeholder='Choose price range'
                css={styles.select}
                allowClear
              >
                {PRICE_LEVEL_OPTIONS.map(({ value, label }) => (
                  <Select.Option key={value} value={value}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Flex>

            {/* Minimum Rating */}
            <Flex vertical gap={8}>
              <label htmlFor='rating-slider' css={styles.label}>
                Only show places rated at least{' '}
                <Text strong>{minRating.toFixed(1)}</Text>
              </label>
              <Slider
                id='rating-slider'
                value={minRating}
                min={RATING_CONFIG.MIN}
                max={RATING_CONFIG.MAX}
                step={RATING_CONFIG.STEP}
                onChange={setMinRating}
                css={styles.slider}
                tooltip={{ formatter: (value) => value?.toFixed(1) }}
              />
              <Flex justify='space-between'>
                <Text type='secondary'>Any</Text>
                <Text type='secondary'>{RATING_CONFIG.MAX}</Text>
              </Flex>
            </Flex>

            {/* Reset Button */}
            <Button
              variant='outlined'
              css={styles.resetButton}
              onClick={handleReset}
            >
              Clear all filters
            </Button>
          </Flex>
        </div>
      </Panel>
    </Collapse>
  );
}
