import "./style.css";
import { ComponentContainer } from "./ComponentsContainer";
import { componentList } from "../Data/ComponentList";
import { IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { PropertiesEditor } from "./PropertiesEditor";
import { useStateValue } from "../../ContextAPI/StateProvider";

export const EditorPicker = () => {
  const [state, dispatch] = useStateValue();
  return (
    <section>
      <div className="section__top">
        <Button variant="contained" startIcon={<PlayArrowIcon />}>
          Preview
        </Button>
      </div>
      <TextField
        style={{ width: "100%" }}
        label="Search Components"
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <h1 className="section__menu__title">Components</h1>
      <div className="section__menu__list">
        {componentList?.map((details) => (
          <ComponentContainer details={details} />
        ))}
      </div>

      {state?.activeElement && <PropertiesEditor />}
    </section>
  );
};
