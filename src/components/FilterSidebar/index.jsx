import PriceRange from '../PriceRangeSlider/index.jsx';
import Category from '../Category/index.jsx';
import { FormControl, MenuItem, Select } from '@mui/material';

const FilterSidebar = ({ filters, setFilters, categories, brands }) => {
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
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Sort By</h3>
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
          }}
        >
          <Select
            displayEmpty
            value={filters.sortBy || ''}
            onChange={(value) => setFilters({ ...filters, sortBy: value })}
            inputProps={{
              'aria-label': 'Without label',
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
        <h3 className="text-lg font-semibold mb-3">Minimum Rating</h3>
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
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
