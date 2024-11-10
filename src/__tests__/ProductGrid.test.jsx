import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

describe('ProductGrid', () => {
  it('renders loading state correctly', () => {
    render(<ProductGrid products={[]} isLoading={true} />);
    const skeletons = screen.getAllByTestId('product-skeleton');
    expect(skeletons).toHaveLength(6);
  });

  it('renders no products found message when products array is empty', () => {
    render(<ProductGrid products={[]} isLoading={false} />);
    expect(screen.getByText('No products found')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Try adjusting your filters to find what you're looking for",
      ),
    ).toBeInTheDocument();
  });

  it('renders products correctly', () => {
    render(<ProductGrid products={products} isLoading={false} />);
    products.slice(0, 6).forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(
        screen.getByText(`$${product.price.toFixed(2)}`),
      ).toBeInTheDocument();
    });
  });

  if (products.length > 6) {
    it('renders pagination when there are more than 6 products', () => {
      render(<ProductGrid products={products} isLoading={false} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  }
});
