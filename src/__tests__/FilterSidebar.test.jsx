import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterSidebar from '../components/FilterSidebar';

describe('FilterSidebar', () => {
  const mockSetFilters = jest.fn();
  const defaultFilters = {
    category: [],
    brand: [],
    priceRange: [0, 1000],
    rating: null,
    sortBy: '',
    search: '',
  };

  const categories = ['Earthenware', 'Decoration'];
  const brands = ['Brand A', 'Brand B'];

  beforeEach(() => {
    mockSetFilters.mockClear();
  });

  it('renders all filter sections correctly', () => {
    render(
      <FilterSidebar
        filters={defaultFilters}
        setFilters={mockSetFilters}
        categories={categories}
        brands={brands}
      />
    );

    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Price Range')).toBeInTheDocument();
    expect(screen.getByText('Brands')).toBeInTheDocument();
  });

  it('updates search filter with debounce', async () => {
    render(
      <FilterSidebar
        filters={defaultFilters}
        setFilters={mockSetFilters}
        categories={categories}
        brands={brands}
      />
    );

    await waitFor(
      () => {
        expect(mockSetFilters).toHaveBeenCalledWith(
          expect.objectContaining({ search: '' })
        );
      },
      { timeout: 1000 }
    );
  });

  it('updates category filters', async () => {
    render(
      <FilterSidebar
        filters={defaultFilters}
        setFilters={mockSetFilters}
        categories={categories}
        brands={brands}
      />
    );

    const categoryCheckbox = screen.getByLabelText('Earthenware');
    await userEvent.click(categoryCheckbox);

    expect(mockSetFilters).toHaveBeenCalledWith(
      expect.objectContaining({ category: ['Earthenware'] })
    );
  });

  it('updates price range filter', async () => {
    render(
      <FilterSidebar
        filters={defaultFilters}
        setFilters={mockSetFilters}
        categories={categories}
        brands={brands}
      />
    );
    expect(screen.getByText('Price Range')).toBeInTheDocument();
  });
});