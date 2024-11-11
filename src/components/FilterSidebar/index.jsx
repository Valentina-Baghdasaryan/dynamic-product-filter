import PriceRange from '../PriceRangeSlider/index.jsx';
import Category from '../Category/index.jsx';
import { FormControl, Input, MenuItem, Select } from '@mui/material';

import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce.js';

const FilterSidebar = ({ filters, setFilters, categories, brands }) => {
  const [searchInput, setSearchInput] = useState(filters.search || '');
  console.log(searchInput, 'searchInputsearchInput');
  
  const debouncedSearch = useDebounce(searchInput, 500);

  const handleCategoryChange = (category) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category];
    setFilters({ ...filters, category: newCategories });
  };

  const handleBrandChange = (brand) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter((b) => b !== brand)
      : [...filters.brand, brand];
    setFilters({ ...filters, brand: newBrands });
  };

  useEffect(() => {
    setFilters({ ...filters, search: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <div className={styles.filterSide}>
      <div>
        <h3>Search</h3>
        <Input
          type="text"
          placeholder="Search products..."
          value={filters.search || ''}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{
            border: '1px solid #915F6D',
            borderRadius: '4px',
            padding: '8px',
            '&:hover': {
              borderColor: 'purple',
            },
            '&:focus-within': {
              borderColor: '#915F6D',
            },
          }}
        />
      </div>

      <div>
        <h3>Sort By</h3>
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#DA70D6',
              },
              '&:hover fieldset': {
                borderColor: 'purple',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#915F6D	',
              },
            },
          }}
        >
          <Select
            displayEmpty
            value={filters.sortBy || ''}
            onChange={(event) =>
              setFilters({ ...filters, sortBy: event.target.value })
            }
            inputProps={{
              'aria-label': 'Without label',
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  '& .Mui-selected': {
                    backgroundColor: '#D8BFD8',
                    '&:hover': {
                      backgroundColor: '#CF9FFF',
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="">Featured</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="rating-low">Rating: Low to High</MenuItem>
            <MenuItem value="rating-high">Rating: High to Low</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Category
        data={categories}
        filters={filters}
        title="Categories"
        type="category"
        handleOnChange={handleCategoryChange}
      />
      <PriceRange filters={filters} setFilters={setFilters} />
      <Category
        data={brands}
        filters={filters}
        title="Brands"
        type="brand"
        handleOnChange={handleBrandChange}
      />
      <div>
        <h3>Minimum Rating</h3>
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#DA70D6',
              },
              '&:hover fieldset': {
                borderColor: 'purple',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#915F6D	',
              },
            },
          }}
        >
          <Select
            displayEmpty
            value={filters.rating?.toString() || ''}
            onChange={(value) =>
              setFilters({ ...filters, rating: value ? Number(value) : null })
            }
            inputProps={{
              'aria-label': 'Without label',
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  '& .Mui-selected': {
                    backgroundColor: '#D8BFD8',
                    '&:hover': {
                      backgroundColor: '#CF9FFF',
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="">Any Rating</MenuItem>
            <MenuItem value="4">4+ Stars</MenuItem>
            <MenuItem value="3">3+ Stars</MenuItem>
            <MenuItem value="2">2+ Stars</MenuItem>
            <MenuItem value="1">1+ Stars</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
export default FilterSidebar;
