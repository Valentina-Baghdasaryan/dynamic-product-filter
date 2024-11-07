import { FormControl, MenuItem } from '@mui/material';

const Select = ({ data, title }) => {
    
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>{' '}
      <FormControl
        sx={{
          m: 1,
          minWidth: 120,
        }}
      >
        <Select
          displayEmpty
          value={''}
          inputProps={{
            'aria-label': 'Without label',
          }}
        >
          <MenuItem value="">
            <em> None </em>
          </MenuItem>
          {data && data.map((item) => (
            <MenuItem key={item.id} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Select;
