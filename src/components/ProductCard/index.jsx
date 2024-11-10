import { Rating } from '@mui/material';

import styles from './index.module.scss';

const ProductCard = ({ product }) => {
  return (
    <div key={product.id} className={styles.product}>
      <img
        src={product.imageUrl}
        alt={product.name}
        className={styles.productImg}
      />
      <h5 className={styles.productTitle}>{product.name}</h5>
      <span className={styles.brand}>{product.brand}</span>
      <div className={styles.ratingWrapper}>
        <Rating
          name="read-only"
          value={product.rating}
          readOnly
          className={styles.rating}
        />
        <span className={styles.ratingValue}>
          <p>{product.rating}</p>
        </span>
      </div>
      <span className={styles.price}>${product.price}</span>
    </div>
  );
};

export default ProductCard;
