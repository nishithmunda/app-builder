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
import { useState } from "react";

export const EditorPicker = () => {
  const [state, dispatch] = useStateValue();
  const [searchComponents, setSearchComponents] = useState(componentList);

  const filterWithName = (list, searchParams) => {
    return list.filter(({ name }) => {
      const nameString = name.toLowerCase();
      return nameString.includes(searchParams.toLowerCase());
    });
  };

  function handleOnSearch(searchParams) {
    let filterValue = filterWithName(componentList, searchParams);
    filterValue?.length > 0 && setSearchComponents(filterValue);
  }

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
        onChange={(e) => handleOnSearch(e.target.value)}
      />
      <h1 className="section__menu__title">Components</h1>
      <div className="section__menu__list">
        {searchComponents?.map((details) => (
          <ComponentContainer details={details} />
        ))}
      </div>

      {state?.activeElement && <PropertiesEditor />}
    </section>
  );
};
