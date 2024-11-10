import { Slider } from '@mui/material';

const PriceRange = ({ filters, setFilters }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Price Range</h3>
      <div className="px-2">
        <Slider
          value={[filters.priceRange[0], filters.priceRange[1]]}
          min={0}
          max={1000}
          step={10}
          valueLabelDisplay="auto"
          onChange={(event, value) =>
            setFilters({ ...filters, priceRange: value })
          }
        />
        <div>
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
