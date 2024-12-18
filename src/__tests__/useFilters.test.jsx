import { renderHook, act } from '@testing-library/react';
import { useFilters } from '../hooks/useFilter';

describe('useFilters', () => {
  const mockProducts = [
    {
      "id": 1,
      "name": "Flower Pot",
      "category": "Earthenware",
      "brand": "Brand A",
      "price": 99.99,
      "rating": 4.5,
      "imageUrl": "/products/product1.png"
    },
    {
      "id": 2,
      "name": "Candle",
      "category": "Decoration",
      "brand": "Brand B",
      "price": 49.99,
      "rating": 4.0,
      "imageUrl": "/products/product2.png"
    },
    {
      "id": 3,
      "name": "White Candle",
      "category": "Decoration",
      "brand": "Brand B",
      "price": 59.99,
      "rating": 4.2,
      "imageUrl": "/products/product3.png"
    },
    {
      "id": 4,
      "name": "Clay Cup",
      "category": "Earthenware",
      "brand": "Brand D",
      "price": 499.99,
      "rating": 4.8,
      "imageUrl": "/products/product4.png"
    },
    {
      "id": 5,
      "name": "Flower Pot",
      "category": "Decoration",
      "brand": "Brand A",
      "price": 198.17,
      "rating": 4.7,
      "imageUrl": "/products/product5.png"
    },
    {
      "id": 6,
      "name": "Clay Cup",
      "category": "Earthenware",
      "brand": "Brand D",
      "price": 145.99,
      "rating": 4.2,
      "imageUrl": "/products/product6.png"
    },
    {
      "id": 7,
      "name": "Clay Plate",
      "category": "Earthenware",
      "brand": "Brand C",
      "price": 311.99,
      "rating": 4.9,
      "imageUrl": "/products/product7.png"
    },
    {
      "id": 8,
      "name": "Clay Cup",
      "category": "Earthenware",
      "brand": "Brand D",
      "price": 214.15,
      "rating": 4.8,
      "imageUrl": "/products/product8.png"
    },
    {
      "id": 9,
      "name": "Leather Jacket",
      "category": "Clothing",
      "brand": "Brand E",
      "price": 209.19,
      "rating": 5,
      "imageUrl": "/products/product9.png"
    },
    {
      "id": 10,
      "name": "Sweatshirt",
      "category": "Clothing",
      "brand": "Brand E",
      "price": 198.89,
      "rating": 4.9,
      "imageUrl": "/products/product10.png"
    },
    {
      "id": 11,
      "name": "Leather Jacket",
      "category": "Clothing",
      "brand": "Brand F",
      "price": 195.37,
      "rating": 3.8,
      "imageUrl": "/products/product11.png"
    },
    {
      "id": 12,
      "name": "Shirt",
      "category": "Clothing",
      "brand": "Brand E",
      "price": 139.14,
      "rating": 4.6,
      "imageUrl": "/products/product12.png"
    },
    {
      "id": 13,
      "name": "Shirt",
      "category": "Clothing",
      "brand": "Brand E",
      "price": 139.19,
      "rating": 4.9,
      "imageUrl": "/products/product13.png"
    },
    {
      "id": 14,
      "name": "Honey",
      "category": "Sweets",
      "brand": "Brand S",
      "price": 95.19,
      "rating": 5,
      "imageUrl": "/products/product14.png"
    },
    {
      "id": 15,
      "name": "Rosemary Salt",
      "category": "Food",
      "brand": "Brand S",
      "price": 80.65,
      "rating": 5,
      "imageUrl": "/products/product15.png"
    },
    {
      "id": 16,
      "name": "Salted Caramel",
      "category": "Sweets",
      "brand": "Brand S",
      "price": 45.78,
      "rating": 3.7,
      "imageUrl": "/products/product16.png"
    },
    {
      "id": 17,
      "name": "Marmalade",
      "category": "Sweets",
      "brand": "Brand S",
      "price": 69.21,
      "rating": 4.9,
      "imageUrl": "/products/product17.png"
    },
    {
      "id": 18,
      "name": "Honey",
      "category": "Sweets",
      "brand": "Brand S",
      "price": 79.81,
      "rating": 4.8,
      "imageUrl": "/products/product18.png"
    },
    {
      "id": 19,
      "name": "Lampshade",
      "category": "Decoration",
      "brand": "Brand K",
      "price": 109.94,
      "rating": 4.6,
      "imageUrl": "/products/product19.png"
    },
    {
      "id": 20,
      "name": "Lampshade",
      "category": "Decoration",
      "brand": "Brand K",
      "price": 99.99,
      "rating": 4.5,
      "imageUrl": "/products/product20.png"
    },
    {
      "id": 21,
      "name": "Phone",
      "category": "Electronics",
      "brand": "Brand L",
      "price": 249.39,
      "rating": 4.7,
      "imageUrl": "/products/product21.png"
    },
    {
      "id": 22,
      "name": "iPhone",
      "category": "Electronics",
      "brand": "Brand L",
      "price": 45639,
      "rating": 4.8,
      "imageUrl": "/products/product22.png"
    },
    {
      "id": 23,
      "name": "Apple MacBook",
      "category": "Electronics",
      "brand": "Brand L",
      "price": 795.49,
      "rating": 4.9,
      "imageUrl": "/products/product23.png"
    },
    {
      "id": 24,
      "name": "Laptop HP",
      "category": "Electronics",
      "brand": "Brand L",
      "price": 539.99,
      "rating": 4.2,
      "imageUrl": "/products/product24.png"
    },
    {
      "id": 25,
      "name": "Laptop ASUS",
      "category": "Electronics",
      "brand": "Brand L",
      "price": 493.94,
      "rating": 4.5,
      "imageUrl": "/products/product25.png"
    }
  ]

  it('filters products by search term', () => {
    const { result } = renderHook(() => useFilters(mockProducts));
    
    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        search: 'Clay',
      });
    });

    expect(result.current.filteredProducts[0].name).toContain('Clay');
  });

  it('filters products by category', () => {
    const { result } = renderHook(() => useFilters(mockProducts));
    
    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        category: ['Electronics'],
      });
    });

    expect(result.current.filteredProducts.every(p => p.category === 'Electronics')).toBe(true);
  });

  it('filters products by price range', () => {
    const { result } = renderHook(() => useFilters(mockProducts));
    
    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        priceRange: [0, 100],
      });
    });

    expect(result.current.filteredProducts).toHaveLength(0);
    expect(result.current.filteredProducts.every(p => p.price <= 100)).toBe(true);
  });

  it('filters products by brand', () => {
    const { result } = renderHook(() => useFilters(mockProducts));
    
    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        brand: ['Brand A'],
      });
    });

    expect(result.current.filteredProducts).toHaveLength(0);
    expect(result.current.filteredProducts.every(p => p.brand === 'Brand A')).toBe(true);
  });

  it('filters products by rating', () => {
    const { result } = renderHook(() => useFilters(mockProducts));
    
    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        rating: 4,
      });
    });

    expect(result.current.filteredProducts.every(p => p.rating >= 4)).toBe(true);
  });

  it('sorts products by price low to high', () => {
    const { result } = renderHook(() => useFilters(mockProducts));
    
    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        sortBy: 'price-low',
      });
    });

    const prices = result.current.filteredProducts.map(p => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it('returns empty array when no products match filters', () => {
    const { result } = renderHook(() => useFilters(mockProducts));
    
    act(() => {
      result.current.setFilters({
        ...result.current.filters,
        search: 'NonexistentProduct',
      });
    });

    expect(result.current.filteredProducts).toHaveLength(0);
  });
});