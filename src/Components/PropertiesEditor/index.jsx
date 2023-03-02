import TextField from "@mui/material/TextField";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { actionTypes } from "../../ContextAPI/reducer";

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
          <h1>Properties</h1>

          <TextField
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
        </div>
      )}
    </>
  );
}
