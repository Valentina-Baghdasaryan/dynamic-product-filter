import React from 'react'; // Add this line
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FilterSidebar from '../components/FilterSidebar/index';
describe('FilterSidebar', () => {
  const mockSetFilters = jest.fn();
  const defaultFilters = {
    category: [],
    brand: [],
    priceRange: [0, 1000],
    rating: null,
    sortBy: 'featured',
    search: '',
  };

  const categories = ['Electronics', 'Clothing', 'Footwear'];
  const brands = ['Brand A', 'Brand B', 'Brand C'];
  beforeEach(() => {
    mockSetFilters.mockClear();
  });

  it('renders all filter sections', () => {
    render(
      <FilterSidebar
        filters={defaultFilters}
        setFilters={mockSetFilters}
        categories={categories}
        brands={brands}
      />,
    );

    expect(
      screen.getByPlaceholderText('Search products...'),
    ).toBeInTheDocument();
    expect(screen.getByText('Sort By')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Price Range')).toBeInTheDocument();
    expect(screen.getByText('Brands')).toBeInTheDocument();
    expect(screen.getByText('Minimum Rating')).toBeInTheDocument();
  });

  it('updates search filter with debounce', async () => {
    render(
      <FilterSidebar
        filters={defaultFilters}
        setFilters={mockSetFilters}
        categories={categories}
        brands={brands}
      />,
    );

    const searchInput = screen.getByPlaceholderText('Search products...');
    await userEvent.type(searchInput, 'test');
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(mockSetFilters).toHaveBeenCalledWith(
      expect.objectContaining({ search: 'test' }),
    );
  });
  it('updates category filters', () => {
    render(
      <FilterSidebar
        filters={defaultFilters}
        setFilters={mockSetFilters}
        categories={categories}
        brands={brands}
      />,
    );

    const categoryCheckbox = screen.getByLabelText('Electronics');
    fireEvent.click(categoryCheckbox);
    expect(mockSetFilters).toHaveBeenCalledWith(
      expect.objectContaining({ category: ['Electronics'] }),
    );
  });
});
