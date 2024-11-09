import React, { useState } from 'react';
import styles from './index.module.scss';
import ProductCard from '../ProductCard';

const ProductGrid = ({ products }) => {
  // const [currentPage, setCurrentPage] = useState(1);

  // const totalPages = Math.ceil(products.length / itemsPerPage);

  // const indexOfLastProduct = currentPage * itemsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  // const currentProducts = products.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct,
  // );


  // const handlePrevious = () => {
  //   setCurrentPage((prev) => Math.max(prev - 1, 1));
  // };

  // const handleNext = () => {
  //   setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  // };

  return (
    <div className={styles.productsWrapper}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {/* {products.length && totalPages >= 2 && (
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
      )} */}
    </div>
  );
};

export default ProductGrid;
