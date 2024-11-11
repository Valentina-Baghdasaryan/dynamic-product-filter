import { Slider } from '@mui/material';

import styles from './index.module.scss';

const PriceRange = ({ filters, setFilters }) => {
  return (
    <div>
      <h3>Price Range</h3>
      <div>
        <Slider
          value={[filters.priceRange[0], filters.priceRange[1]]}
          min={0}
          max={1000}
          step={10}
          valueLabelDisplay="auto"
          onChange={(event, value) =>
            setFilters({ ...filters, priceRange: value })
          }
          sx={{
            color: '#915F6D',
            '& .MuiSlider-thumb': {
              backgroundColor: 'white',
            },
            '& .MuiSlider-rail': {
              color: 'gray',
            },
          }}
        />
        <div className={styles.priceWrapper}>
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
