import useDragger from "../Hooks/useDragger";
import { useId, useRef, useState } from "react";

import { actionTypes } from "../ContextAPI/reducer";
import { useStateValue } from "../ContextAPI/StateProvider";
import DeleteIcon from "@mui/icons-material/Delete";

export const ElementWrapper = ({ childComp, type, properties, eleId_prop }) => {
  const [state, dispatch] = useStateValue();
  const eleId = useId();
  const time = new Date().valueOf();
  let uniqueId = eleId_prop || `${eleId}-${type}-${time}`;
  useDragger(uniqueId, type, { top: properties?.top, left: properties?.left });

  const handleDeleteItem = (uniqueId) => {
    dispatch({
      type: actionTypes.REMOVE_ELEMENT,
      payload: uniqueId,
    });
  };
  return (
    <div
      id={uniqueId}
      className="element__box"
      style={{ top: properties?.top, left: properties?.left }}
    >
      {childComp(properties)}
      <DeleteIcon
        className="delete__icon"
        onClick={() => handleDeleteItem(eleId_prop)}
      />
    </div>
  );
};
