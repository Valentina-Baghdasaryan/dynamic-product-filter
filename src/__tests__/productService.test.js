import { fetchProducts } from '../services/api';

describe('productService', () => {
  const mockProducts = [{
    id: 1,
    name: "Flower Pot",
    category: "Earthenware",
    brand: "Brand A",
    price: 99.99,
    rating: 4.5,
    imageUrl: "/products/product1.png"
  }];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      })
    );
  });

  it('fetches products successfully', async () => {
    const products = await fetchProducts();
    expect(products).toEqual(mockProducts);
    expect(fetch).toHaveBeenCalledWith('/products.json');
  });

  it('handles fetch error', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found',
      })
    );

    await expect(fetchProducts()).rejects.toThrow('Error fetching data: Not Found');
  });
});