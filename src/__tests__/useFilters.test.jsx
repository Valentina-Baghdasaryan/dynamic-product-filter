import { renderHook, act } from '@testing-library/react';
import { useFilters } from '../hooks/useFilters';
import { products } from '../data/products';
describe('useFilters', () => {
  it('initializes with default filters', () => {
    const { result } = renderHook(() => useFilters(products));
    expect(result.current.filters).toEqual({
      category: [],
      brand: [],
      priceRange: [0, 1000],
      rating: null,
      sortBy: 'featured',
      search: '',
    });
  });
  it('filters products by search term', () => {
    const { result } = renderHook(() => useFilters(products));

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        search: 'Wireless',
      });
    });
    expect(result.current.filteredProducts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: expect.stringContaining('Wireless') }),
      ]),
    );
  });
  it('filters products by price range', () => {
    const { result } = renderHook(() => useFilters(products));

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        priceRange: [0, 100],
      });
    });
    result.current.filteredProducts.forEach((product) => {
      expect(product.price).toBeLessThanOrEqual(100);
      expect(product.price).toBeGreaterThanOrEqual(0);
    });
  });
  it('sorts products by price low to high', () => {
    const { result } = renderHook(() => useFilters(products));

    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        sortBy: 'price-low',
      });
    });
    const prices = result.current.filteredProducts.map(
      (product) => product.price,
    );
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });
});
