/** @jsxImportSource @emotion/react */
import { SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Flex, Input, Select, Slider } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Button } from './Button';

type FiltersProps = {
  onFilterChange: (filters: Filters) => void;
};

const SORT_OPTIONS = [
  { value: 'score', label: 'Best Match' },
  { value: 'rating', label: 'Highest Rating' },
  { value: 'distance', label: 'Closest' }
] as const;

const MIN_RATING = 0;
const MAX_RATING = 5;
const RATING_STEP = 0.1;

export default function Filters({ onFilterChange }: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortByOption>('score');
  const [minRating, setMinRating] = useState(0);

  const filters = useMemo(
    () => ({ searchTerm, sortBy, minRating }),
    [searchTerm, sortBy, minRating]
  );

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleReset = () => {
    setSearchTerm('');
    setSortBy('score');
    setMinRating(0);
  };

  return (
    <div css={styles.container}>
      <h2 css={styles.heading}>Filters</h2>

      <Flex vertical gap={24}>
        <Flex vertical gap={8}>
          <label css={styles.label}>Search</label>
          <div css={styles.inputWrapper}>
            <SearchOutlined css={styles.searchIcon} />
            <Input
              aria-label='Search restaurants'
              placeholder='Search restaurants...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              css={styles.input}
            />
          </div>
        </Flex>

        <Flex vertical gap={8}>
          <label css={styles.label}>Sort By</label>
          <Select
            aria-label='Sort by'
            value={sortBy}
            onChange={(value) => {
              setSortBy(value);
            }}
            css={styles.select}
          >
            {SORT_OPTIONS.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Flex>

        <Flex vertical gap={8}>
          <label css={styles.label}>Minimum Rating</label>
          <Slider
            value={minRating}
            min={MIN_RATING}
            max={MAX_RATING}
            step={RATING_STEP}
            onChange={(value) => {
              setMinRating(value);
            }}
            css={styles.slider}
          />
          <Flex justify='space-between'>
            <span>0</span>
            <span>5</span>
          </Flex>
        </Flex>

        <Button
          variant='outlined'
          css={styles.resetButton}
          onClick={handleReset}
        >
          Reset Filters
        </Button>
      </Flex>
    </div>
  );
}

const styles = {
  container: css`
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  `,

  heading: css`
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  `,

  label: css`
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
  `,

  inputWrapper: css`
    position: relative;
  `,

  searchIcon: css`
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-inactive);
    z-index: 1;
  `,

  input: css`
    padding-left: 2rem !important;
  `,

  select: css`
    width: 100%;
  `,

  slider: css`
    margin: 0.5rem 0;
  `,

  resetButton: css`
    width: 100%;
    margin-top: 1rem;
    padding: 1.2rem;
  `
};
