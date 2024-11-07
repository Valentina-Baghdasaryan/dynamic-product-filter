import { Slider } from '@mui/material';
import { useState } from 'react';

function valueText(value) {
  return `${value}$`;
}

const minDistance = 10;

const PriceRange = () => {
  const [value1, setValue1] = useState([20, 37]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Price Range</h3>
      <div>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={value1}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          getAriaValueText={valueText}
          disableSwap
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>${value1[0]}</span>
          <span>${value1[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
