import {
  useEffect,
  useState
} from 'react';

const initialFilterState = {
  category: [],
  brand: [],
  priceRange: [0, 1000],
  rating: null,
  sortBy: 'featured',
};

export const useFilters = (products) => {
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem('filters');
    return saved ? JSON.parse(saved) : initialFilterState;
  });

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));

    let result = [...products];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.category.length > 0) {
      result = result.filter((product) =>
        filters.category.includes(product.category),
      );
    }

    if (filters.brand.length > 0) {
      result = result.filter((product) =>
        filters.brand.includes(product.brand),
      );
    }

    result = result.filter(
      (product) =>
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1],
    );

    if (filters.rating) {
      result = result.filter((product) => product.rating >= filters.rating);
    }

    switch (filters.sortBy) {
      case 'price-low':
        result.sort((item1, item2) => item1.price - item2.price);
        break;
      case 'price-high':
        result.sort((item1, item2) => item2.price - item1.price);
        break;
      case 'rating-low':
        result.sort((item1, item2) => item1.rating - item2.rating);
        break;
      case 'rating-high':
        result.sort((item1, item2) => item2.rating - item1.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [filters, products]);

  return {
    filters,
    setFilters,
    filteredProducts,
  };
};