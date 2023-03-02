import { CustomButton } from "../CommonComponents/Button";
import { CustomTable } from "../CommonComponents/Table";
import { CustomInput } from "../CommonComponents/Input";
import { CustomSelect } from "../CommonComponents/Select";

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
      <CustomButton
        variant={properties?.varient || "outlined"}
        width={properties?.width}
        name={properties?.name}
      />
    ),
    supportText: "Trigger actions like run queries, export data etc.",
    icon: <SmartButtonIcon />,
  },
  {
    type: "input_id",
    name: "Text Input",
    component: (properties) => (
      <CustomInput width={properties?.width} name={properties?.name} />
    ),
    supportText: "Basic input field",
    icon: <TextFieldsIcon />,
  },
  {
    type: "dropdown_id",
    name: "Dropdown",
    component: (properties) => (
      <CustomSelect width={properties?.width} name={properties?.name} />
    ),
    supportText: "Select from a set of options, with a dropdown.",
    icon: <ArrowDropDownCircleIcon />,
  },
  {
    type: "table_id",
    name: "Table",
    component: (properties) => <CustomTable />,
    supportText: "Display tabular data with pagination.",
    icon: <GridOnIcon />,
  },
];
