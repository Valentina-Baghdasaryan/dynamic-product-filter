import React from 'react';
import styles from './index.module.scss';
import ProductCard from '../ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <main className={styles.productsWrapper}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
};

export default ProductGrid;
