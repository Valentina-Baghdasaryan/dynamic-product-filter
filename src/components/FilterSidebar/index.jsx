import React from 'react';
import Category from '../Category/index.jsx';

import styles from './index.module.scss';

const FilterSidebar = ({ data, categories }) => {

  return (
    <aside className={styles.filterSide}>
      {/* <Select data={data} title="Minimum Rating" /> */}
      <Category data={categories} title="dff" />
    </aside>
  );
};

export default FilterSidebar;
