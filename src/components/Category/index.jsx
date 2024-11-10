import { Checkbox } from '@mui/material';

const Category = ({ data, filters, title, type, handleOnChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-2">
        {data?.map((item, index) => (
          <div key={index} className="flex items-center">
            <Checkbox
              id={`category-${item}`}
              checked={
                type === 'brand'
                  ? filters.brand.includes(item)
                  : filters.category.includes(item)
              }
              onChange={(e) => handleOnChange(item)}
            />
            <label
              htmlFor={`category-${item}`}
              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
