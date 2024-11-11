import { Checkbox } from '@mui/material';

const Category = ({ data, filters, title, type, handleOnChange }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        {data?.map((item, index) => (
          <div key={index} >
            <Checkbox
              id={`category-${item}`}
              checked={
                type === 'brand'
                  ? filters.brand.includes(item)
                  : filters.category.includes(item)
              }
              onChange={(e) => handleOnChange(item)}
              sx={{
                color: '#915F6D',
                '&.Mui-checked': {
                  color: '#915F6D',
                },
              }}
            />
            <label
              htmlFor={`category-${item}`}
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
