import { Checkbox } from '@mui/material';

const Category = ({ data, title }) => {
  console.log(data, 'dataCategory');
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item} className="flex items-center">
            <Checkbox id={`category-${item}`} />
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
