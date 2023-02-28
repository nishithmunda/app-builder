import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { CreateTable } from "./CreateTable";
//ICONS
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import GridOnIcon from "@mui/icons-material/GridOn";

export const componentList = [
  {
    type: "btn_id",
    name: "Button",
    component: (properties) => (
      <Button variant={properties?.varient||'outlined'}>Outlined</Button>
    ),
    supportText: "Trigger actions like run queries, export data etc.",
    icon: <SmartButtonIcon />,
  },
  {
    type: "input_id",
    name: "Text Input",
    component: (properties) => <Input />,
    supportText: "Basic input field",
    icon: <TextFieldsIcon />,
  },
  {
    type: "dropdown_id",
    name: "Dropdown",
    component: (properties) => (
      <Select
        style={{ width: properties?.width || 200 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    ),
    supportText: "Select from a set of options, with a dropdown.",
    icon: <ArrowDropDownCircleIcon />,
  },
  {
    type: "table_id",
    name: "Table",
    component: (properties) => <CreateTable />,
    supportText: "Display tabular data with pagination.",
    icon: <GridOnIcon />,
  },
];
