import TextField from "@mui/material/TextField";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { actionTypes } from "../../ContextAPI/reducer";
import "./style.css";

export function PropertiesEditor() {
  const [state, dispatch] = useStateValue();

  function handleOnChange(key, value) {
    let targetEleProperties = {
      ...state?.activeElement?.properties,
      [key]: value,
    };

    dispatch({
      type: actionTypes.CHANGE_PROPERTIES,
      payload: { eleId: state?.activeElement?.eleId, targetEleProperties },
    });
  }

  return (
    <>
      {state?.activeElement && (
        <div>
          <h1 className="properties__title">Properties</h1>
          <h2 className="properties__element">{state?.activeElement?.name}</h2>

          <TextField
            style={{ width: "100%" }}
            id="filled-number"
            label="width"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            onChange={(e) => {
              handleOnChange("width", e.target.value);
            }}
          />
          <TextField
            style={{ marginTop: "10px", width: "100%" }}
            id="filled-number"
            label="name"
            type="string"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            onChange={(e) => {
              handleOnChange("name", e.target.value);
            }}
          />
        </div>
      )}
    </>
  );
}
