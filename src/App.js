import './App.scss';
import FilterSidebar from './components/FilterSidebar/index.jsx';
import Header from './components/Header/index.jsx';
import ProductGrid from './components/ProductGrid/index.jsx';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    brand: 'Brand A',
    price: 99.99,
    rating: 4.5,
    imageUrl: '/products/product6.png',
  },
  {
    id: 2,
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    brand: 'Brand B',
    price: 49.99,
    rating: 4.0,
    imageUrl: '/products/product5.png',
  },
  {
    id: 3,
    name: 'Running Shoes',
    category: 'Footwear',
    brand: 'Brand C',
    price: 59.99,
    rating: 4.2,
    imageUrl: '/products/product4.png',
  },
  {
    id: 4,
    name: 'Smartphone',
    category: 'Electronics',
    brand: 'Brand D',
    price: 499.99,
    rating: 4.8,
    imageUrl: '/products/product3.png',
  },
  {
    id: 5,
    name: 'Leather Jacket',
    category: 'Clothing',
    brand: 'Brand E',
    price: 199.99,
    rating: 4.7,
    imageUrl: '/products/product2.png',
  },
  {
    id: 6,
    name: 'Leather Jacket',
    category: 'Clothing',
    brand: 'Brand E',
    price: 199.99,
    rating: 4.7,
    imageUrl: '/products/product1.png',
  },
];

const categories = [1, 2, 3, 4, 5];
const data = [{id: 1, value: 20, name: 'faff'},{id: 2, value: 20, name: 'faff'},{id: 3, value: 20, name: 'faff'},{id: 4, value: 20, name: 'faff'}]

function App() {
  return (
    <div>
      <Header />
      <div className="App">
        <FilterSidebar data={data} categories={categories}/>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default App;
