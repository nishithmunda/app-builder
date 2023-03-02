import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export const CustomSelect = ({ width, name }) => {
  console.log(width);
  return (
    <Select
      style={{ width: `${width || 200}px` }}
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label={name}
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  );
};
