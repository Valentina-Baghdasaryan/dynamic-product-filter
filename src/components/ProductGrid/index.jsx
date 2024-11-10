import React, { useState } from 'react';
import ProductCard from '../ProductCard';

import styles from './index.module.scss';

const ProductGrid = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (currentProducts.length === 0) {
    return (
      <div className={styles.dataNotFound}>
        <h3 className={styles.title}>No products found</h3>
        <p className="text-gray-500 mt-2">
          Try adjusting your filters to find what you're looking for
        </p>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      <div className={styles.productsWrapper}>
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length && totalPages >= 2 && (
        <div className={styles.pagination}>
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
